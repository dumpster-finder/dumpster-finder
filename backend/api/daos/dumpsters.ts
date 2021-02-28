import { MyModels } from "../models";
import { literal } from "sequelize";
import Dumpster from "../types/Dumpster";

export default function ({
    DumpsterPositions,
    Dumpsters,
    DumpsterTypes,
    StoreTypes,
    sequelize,
}: MyModels) {
    return {
        getAll: () =>
            Dumpsters.findAll({
                attributes: [
                    "dumpsterID",
                    "name",
                    "position",
                    "locked",
                    "positiveStoreViewOnDiving",
                    "emptyingSchedule",
                    "cleanliness",
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
                ],
                where: literal(
                    "Dumpsters.revisionID = (SELECT revisionID FROM DumpsterPositions AS dp WHERE dp.dumpsterID = Dumpsters.dumpsterID)",
                ),
            }).then(dumpsters =>
                dumpsters.map<Dumpster>(dumpster => ({
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
                    positiveStoreViewOnDiving:
                        dumpster.positiveStoreViewOnDiving,
                    emptyingSchedule: dumpster.emptyingSchedule,
                    rating: 1, //dumpster.rating
                })),
            ),

        getAllByDumpsterType: (id: number) =>
            Dumpsters.findAll({ where: { dumpsterTypeID: id } }),

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
            const result = await sequelize.transaction(async t => {
                const dumpsterPosition = await DumpsterPositions.create({
                    position,
                }, { transaction: t });
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

                const data = await Dumpsters.create({
                    // @ts-ignore
                    dumpsterID,
                    ...dumpster,
                    dumpsterTypeID,
                    storeTypeID,
                    userID: "temp",
                    position,
                }, { transaction: t });

                await DumpsterPositions.update({
                    // @ts-ignore
                    revisionID: data.dataValues.revisionID,
                }, { where: { dumpsterID }, transaction: t });
                return data;
            });
            return result;
        },
    };
}
