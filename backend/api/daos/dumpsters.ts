import { MyModels } from "../models";
import { literal, Transaction } from "sequelize";
import Dumpster, { DumpsterRevision } from "../types/Dumpster";
import { DumpsterAttributes } from "../models/dumpsters";
import Position, { GeoJSONPoint, PositionParams } from "../types/Position";
import { ConflictError, InvalidKeyError } from "../types/errors";

/**
 * Translates data from a create() or update() call to a valid dumpster
 * @param dumpster
 */
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
    // @ts-ignore
    categories: dumpster.categories && dumpster.categories.map(c => c.name),
    info: dumpster.info,
    // @ts-ignore
    visits: dumpster.dataValues.visits || 0,
    // @ts-ignore
    distance: dumpster.dataValues.distance,
});

const toRevision = (dumpster: DumpsterAttributes): DumpsterRevision => {
    // Exclude rating (it defaults to 2.5)
    const { rating, ...returnable } = toDumpster(dumpster);
    return {
        revisionID: dumpster.revisionID,
        ...returnable,
        dateUpdated: dumpster.dateUpdated,
        // @ts-ignore
        isActive: Boolean(dumpster.dataValues.isActive),
    };
};

const translateToGeoJSONPoint = (position: Position): GeoJSONPoint => ({
    type: "Point",
    coordinates: [position.latitude, position.longitude],
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

/**
 * Data Access Object for dumpsters
 *
 * @param Models - All defined Sequelize models
 */
export default function({
    DumpsterPositions,
    Dumpsters,
    DumpsterCategories,
    Categories,
    DumpsterTypes,
    StoreTypes,
    sequelize,
}: MyModels) {
    /**
     * Common procedures in addOne() and updateOne(),
     * in one neat & tidy package!
     */
    const createDumpsterRevision = async (
        dumpsterID: number,
        dumpster: Omit<Dumpster, "dumpsterID" | "rating" | "visits"> &
            Partial<Dumpster>,
        position: GeoJSONPoint,
        t: Transaction,
    ) => {
        // TODO refactor these calls as subqueries
        //      (really though?)
        const { dumpsterTypeID } = await DumpsterTypes.findOne({
            where: { name: dumpster.dumpsterType },
            transaction: t,
        }).then(t => {
            if (!t) throw new InvalidKeyError("No such dumpster type");
            return t;
        });
        const { storeTypeID } = await StoreTypes.findOne({
            where: { name: dumpster.storeType },
            transaction: t,
        }).then(t => {
            if (!t) throw new InvalidKeyError("No such store type");
            return t;
        });

        const data = await Dumpsters.create(
            {
                dumpsterID,
                ...dumpster,
                dumpsterTypeID,
                storeTypeID,
                userID: 1,
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
            // Override these values ??? they should be valid
            storeType: dumpster.storeType,
            dumpsterType: dumpster.dumpsterType,
            categories: dumpster.categories,
            // Also override these...
            rating: dumpster.rating || 2.5,
            visits: dumpster.visits || 0,
        };
    };

    return {
        /**
         * Fetches all dumpsters in a given radius around a position (lat, long)
         *
         * @param latitude
         * @param longitude
         * @param radius
         * @return The dumpsters that fit the query
         */
        getAll: ({
            latitude,
            longitude,
            radius,
            visitSinceDate,
        }: PositionParams) =>
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
                    [
                        literal(
                            `(SELECT COUNT(*) from Visits as v where v.dumpsterID = Dumpsters.dumpsterID AND v.visitDate > CONVERT('${escape(
                                visitSinceDate,
                            )}',DATETIME) )`,
                        ),
                        "visits",
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
                    )})'), position) <= ${escape(
                        String(radius),
                    )} ORDER BY distance ASC`,
                ),
                limit: 300,
            }).then(dumpsters => dumpsters.map(toDumpster)),

        /**
         * Get one dumpster by ID
         * TODO: Check if SQL injection is still possible after using sequelize.escape()
         *       (it should not, especially since the endpoint route requires an ID)
         *
         * @param dumpsterID
         * @return null if not found, a dumpster if found
         */
        getOne: (dumpsterID: number, visitSinceDate: string) =>
            Dumpsters.findOne({
                attributes: [
                    ...dumpsterAttributes,
                    [
                        literal(
                            `(SELECT COUNT(*) from Visits as v where v.dumpsterID = Dumpsters.dumpsterID AND v.visitDate > CONVERT('${escape(
                                visitSinceDate,
                            )}',DATETIME) )`,
                        ),
                        "visits",
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
                    `dumpsterID = ${sequelize.escape(
                        dumpsterID,
                    )} AND revisionID = (SELECT revisionID FROM DumpsterPositions AS dp WHERE dp.dumpsterID = Dumpsters.dumpsterID)`,
                ),
            }).then(dumpster => dumpster && toDumpster(dumpster)),

        /**
         * Get a dumpster's full revision history
         * TODO pagination...
         *
         * @param dumpsterID
         * @return a list of revisions
         */
        getRevisions: (dumpsterID: number) =>
            Dumpsters.findAll({
                attributes: [
                    ...dumpsterAttributes.slice(
                        0,
                        dumpsterAttributes.length - 1,
                    ),
                    "dateUpdated",
                    "revisionID",
                    [
                        literal(
                            "(Dumpsters.revisionID = (SELECT dp.revisionID FROM DumpsterPositions AS dp WHERE dp.dumpsterID = Dumpsters.dumpsterID))",
                        ),
                        "isActive",
                    ],
                ],
                include: [
                    {
                        // @ts-ignore
                        model: Categories,
                        as: "categories",
                    },
                ],
                where: {
                    dumpsterID,
                },
                limit: 300,
                order: [["dateUpdated", "DESC"]],
            }).then(data => data.map(toRevision)),

        /**
         * Change a dumpster's active revision
         * (used to revert to a previous edit in case of mischievous activity)
         *
         * @param dumpsterID - ID of the dumpster you'd like to update
         * @param revisionID - Revision to revert to
         */
        setActiveRevision: async (dumpsterID: number, revisionID: number) => {
            return sequelize.transaction(async t => {
                // Check that the pair of revision and dumpster ID is valid
                const match = await Dumpsters.findOne({
                    where: {
                        dumpsterID,
                        revisionID,
                    },
                    transaction: t,
                });

                if (!match)
                    throw new InvalidKeyError(
                        "There is no revision with this ID for this dumpster",
                    );

                return await DumpsterPositions.update(
                    {
                        revisionID,
                    },
                    {
                        where: {
                            dumpsterID,
                        },
                        transaction: t,
                    },
                );
            });
        },

        /**
         * Add a dumpster to the database table.
         * When adding, the dumpster does not yet have an ID.
         * A rather complex routine since a revision must be created,
         * and the dumpster's current revision must be set to the one that was added.
         *
         * @param dumpster
         * @return The newly posted data, with an ID
         */
        addOne: async (
            dumpster: Omit<Dumpster, "dumpsterID" | "rating" | "visits">,
        ) => {
            // Rewrite position data to GeoJSON format
            const position = translateToGeoJSONPoint(dumpster.position);

            // Perform transaction
            return await sequelize.transaction(async t => {
                const dumpsterPosition = await DumpsterPositions.create(
                    {
                        position,
                    },
                    { transaction: t },
                ).catch(_ => {
                    throw new ConflictError(
                        "A dumpster already exists at this position",
                    );
                });

                return await createDumpsterRevision(
                    // @ts-ignore
                    dumpsterPosition.dataValues.dumpsterID,
                    dumpster,
                    position,
                    t,
                );
            });
        },

        /**
         * Much like its sibling `addOne`,
         * this function must handle the revision system properly.
         * It updates the current revision ID after the update has been completed
         * ??? and the update is technically a creation, for that matter.
         *
         * @param dumpster
         * @return The updated data
         */
        updateOne: async (dumpster: Omit<Dumpster, "rating" | "visits">) => {
            // TODO should position be editable?
            //      for now I'd say it SHOULD NOT
            //      (especially since this implementation will break the link to the DumpsterPosition)
            return await sequelize.transaction(async t => {
                return await createDumpsterRevision(
                    dumpster.dumpsterID,
                    dumpster,
                    translateToGeoJSONPoint(dumpster.position),
                    t,
                );
            });
        },
    };
}
