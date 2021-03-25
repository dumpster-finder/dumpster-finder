import { MyModels } from "../models";
import { literal } from "sequelize";
import Dumpster from "../types/Dumpster";
import { DumpsterAttributes } from "../models/dumpsters";
import { PositionParams } from "../types/Position";

const toDumpster = (dumpster: DumpsterAttributes): Dumpster => ({
    dumpsterID: dumpster.dumpsterID,
    name: dumpster.name,
    position: {
        // @ts-ignore
        latitude: dumpster.position.coordinates[0],
        // @ts-ignore
        longitude: dumpster.position.coordinates[1],
    },
    cleanliness: dumpster.cleanliness,
    // @ts-ignore
    dumpsterType: dumpster.dataValues.dumpsterType,
    // @ts-ignore
    storeType: dumpster.dataValues.storeType,
    locked: dumpster.locked,
    positiveStoreViewOnDiving: dumpster.positiveStoreViewOnDiving,
    emptyingSchedule: dumpster.emptyingSchedule,
    // @ts-ignore
    rating: dumpster.dataValues.rating || 2.5, // Default to average
    // @ts-ignore TODO make a decision: is this how it should be done?
    categories: dumpster.categories && dumpster.categories.map(c => c.name),
    info: dumpster.info,
});

// The type is (string | ProjectionAlias)[], but I cannot find the definition of ProjectionAlias
const dumpsterAttributes: (string | any)[] = [
    "dumpsterID",
    "name",
    "position",
    "locked",
    "positiveStoreViewOnDiving",
    "emptyingSchedule",
    "cleanliness",
    "info",
    [
        literal(
            "(SELECT t.name FROM DumpsterTypes as t WHERE t.dumpsterTypeID = Dumpsters.dumpsterTypeID)",
        ),
        "dumpsterType",
    ],
    [
        literal(
            "(SELECT t.name FROM StoreTypes as t WHERE t.storeTypeID = Dumpsters.storeTypeID)",
        ),
        "storeType",
    ],
    [
        literal(
            "(SELECT IFNULL(AVG(rating), 2.5) from Ratings where dumpsterID = Dumpsters.dumpsterID)",
        ),
        "rating",
    ],
];

export default function ({
    DumpsterPositions,
    Dumpsters,
    DumpsterCategories,
    Categories,
    DumpsterTypes,
    StoreTypes,
    sequelize,
}: MyModels) {
    return {
        /**
         * Fetches all dumpsters in a given radius around a position (lat, long)
         *
         * @param latitude
         * @param longitude
         * @param radius
         * @return The dumpsters that fit the query
         */
        getAll: ({ latitude, longitude, radius }: PositionParams) =>
            Dumpsters.findAll({
                attributes: [
                    ...dumpsterAttributes,
                    [
                        // Calculate distance here.
                        literal(
                            `SPHERICAL_DISTANCE(ST_GEOMFROMTEXT('POINT(${escape(
                                latitude.toString(),
                            )} ${escape(longitude.toString())})'), position)`,
                        ),
                        "distance",
                    ],
                ],
                include: [
                    {
                        // @ts-ignore
                        model: Categories,
                        as: "categories",
                    },
                ],
                where: literal(
                    // Select only current revision and limit by distance
                    `Dumpsters.revisionID = (SELECT revisionID FROM DumpsterPositions AS dp WHERE dp.dumpsterID = Dumpsters.dumpsterID)
                     AND SPHERICAL_DISTANCE(ST_GEOMFROMTEXT('POINT(${escape(
                         latitude.toString(),
                     )} ${escape(
                        longitude.toString(),
                    )})'), position) <= ${escape(String(radius))}`,
                ),
            }).then(dumpsters => dumpsters.map(toDumpster)),

        /**
         * Get one dumpster by ID
         * TODO: Check if SQL injection is still possible after using sequelize.escape()
         *       (it should not, especially since the endpoint route requires an ID)
         *
         * @param dumpsterID
         * @return null if not found, a dumpster if found
         */
        getOne: (dumpsterID: number) =>
            Dumpsters.findOne({
                attributes: dumpsterAttributes,
                include: [
                    {
                        // @ts-ignore
                        model: Categories,
                        as: "categories",
                    },
                ],
                where: literal(
                    `dumpsterID = ${sequelize.escape(
                        dumpsterID,
                    )} AND revisionID = (SELECT revisionID FROM DumpsterPositions AS dp WHERE dp.dumpsterID = Dumpsters.dumpsterID)`,
                ),
            }).then(dumpster => dumpster && toDumpster(dumpster)),

        /**
         * Add a dumpster to the database table.
         * When adding, the dumpster does not yet have an ID.
         * A rather complex routine since a revision must be created,
         * and the dumpster's current revision must be set to the one that was added.
         *
         * @param dumpster
         * @return The newly posted data, with an ID
         */
        addOne: async (dumpster: Omit<Dumpster, "dumpsterID" | "rating">) => {
            // Rewrite position data to GeoJSON format
            const position = {
                type: "Point",
                coordinates: [
                    dumpster.position.latitude,
                    dumpster.position.longitude,
                ],
            };

            // Perform transaction
            return await sequelize.transaction(async t => {
                const dumpsterPosition = await DumpsterPositions.create(
                    {
                        position,
                    },
                    { transaction: t },
                );
                // @ts-ignore
                const dumpsterID = dumpsterPosition.dataValues.dumpsterID;

                // TODO refactor these calls as subqueries
                const dumpsterTypeID = (
                    await DumpsterTypes.findOne({
                        where: { name: dumpster.dumpsterType },
                        transaction: t,
                    })
                )?.dumpsterTypeID!;
                const storeTypeID = (
                    await StoreTypes.findOne({
                        where: { name: dumpster.storeType },
                        transaction: t,
                    })
                )?.storeTypeID!;

                const data = await Dumpsters.create(
                    {
                        dumpsterID,
                        ...dumpster,
                        dumpsterTypeID,
                        storeTypeID,
                        userID: "temp",
                        position,
                    },
                    { transaction: t },
                );

                // @ts-ignore
                const revisionID = data.dataValues.revisionID;

                await DumpsterPositions.update(
                    {
                        revisionID,
                    },
                    { where: { dumpsterID }, transaction: t },
                );

                if (dumpster.categories) {
                    // And add the categories!
                    await DumpsterCategories.bulkCreate(
                        // @ts-ignore
                        dumpster.categories.map(name => ({
                            categoryID: literal(
                                `(SELECT c.categoryID FROM Categories AS c WHERE c.name = ${sequelize.escape(
                                    name,
                                )})`,
                            ),
                            dumpsterID: dumpsterID,
                            revisionID,
                        })),
                        { transaction: t },
                    );
                }

                return {
                    ...toDumpster(data),
                    // Override these values – they should be valid
                    storeType: dumpster.storeType,
                    dumpsterType: dumpster.dumpsterType,
                    categories: dumpster.categories,
                };
            });
        },

        /**
         * Much like its sibling `addOne`,
         * this function must handle the revision system properly.
         * It updates the current revision ID after the update has been completed
         * – and the update is technically a creation, for that matter.
         *
         * @param dumpster
         * @return The updated data
         */
        updateOne: async (dumpster: Omit<Dumpster, "rating">) => {
            // Rewrite position data to GeoJSON format
            const position = {
                type: "Point",
                coordinates: [
                    dumpster.position.latitude,
                    dumpster.position.longitude,
                ],
            };

            // Perform transaction
            return await sequelize.transaction(async t => {
                // TODO refactor these calls as subqueries
                const dumpsterTypeID = (
                    await DumpsterTypes.findOne({
                        where: { name: dumpster.dumpsterType },
                        transaction: t,
                    })
                )?.dumpsterTypeID!;
                const storeTypeID = (
                    await StoreTypes.findOne({
                        where: { name: dumpster.storeType },
                        transaction: t,
                    })
                )?.storeTypeID!;

                // Create a new revision of the dumpster
                const data = await Dumpsters.create(
                    {
                        ...dumpster,
                        // @ts-ignore TODO this is dumb
                        categories: undefined,
                        dumpsterTypeID,
                        storeTypeID,
                        userID: "temp",
                        position, // TODO should position be editable?
                        //      for now I'd say it SHOULD NOT
                        //      (especially since this implementation will break the link to the DumpsterPosition)
                    },
                    {
                        transaction: t,
                    },
                );

                // @ts-ignore
                const revisionID = data.dataValues.revisionID;

                // Then update the active revisionID
                await DumpsterPositions.update(
                    {
                        revisionID,
                    },
                    {
                        where: { dumpsterID: dumpster.dumpsterID },
                        transaction: t,
                    },
                );

                if (dumpster.categories) {
                    // And update the categories!
                    await DumpsterCategories.bulkCreate(
                        // @ts-ignore
                        dumpster.categories.map(name => ({
                            categoryID: literal(
                                `(SELECT c.categoryID FROM Categories AS c WHERE c.name = ${sequelize.escape(
                                    name,
                                )})`,
                            ),
                            dumpsterID: dumpster.dumpsterID,
                            revisionID,
                        })),
                        { transaction: t },
                    );
                }

                return {
                    ...toDumpster(data),
                    // Override these values – they should be valid
                    storeType: dumpster.storeType,
                    dumpsterType: dumpster.dumpsterType,
                    categories: dumpster.categories,
                };
            });
        },
    };
}
