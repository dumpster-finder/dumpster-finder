import { MyModels } from "../models";
import { CategoryAttributes } from "../models/Categories";
import { literal } from "sequelize";

export default function ({
    Categories,
    Dumpsters,
    DumpsterPositions,
    DumpsterCategories,
    sequelize,
}: MyModels) {
    return {
        getAll: () =>
            Categories.findAll().then(data =>
                data.map(({ categoryID, name }) => ({ categoryID, name })),
            ),

        // to demonstrate how this *might* be done
        getByDumpster: async (dumpsterID: number) => {
            return await sequelize.transaction(async t => {
                const revisionID = (
                    await DumpsterPositions.findOne({
                        where: { dumpsterID },
                        transaction: t,
                    })
                )?.revisionID;

                // @ts-ignore
                const data = await (
                    await Dumpsters.findOne({
                        where: { revisionID },
                        transaction: t,
                    })
                )
                    // @ts-ignore TODO
                    .getCategories({ transaction: t });

                return data.map(
                    (category: CategoryAttributes) => category.name,
                );
            });
        },

        updatePerDumpster: async (dumpsterID: number, categories: string[]) => {
            return await sequelize.transaction(async t => {
                const revisionID = (
                    await DumpsterPositions.findOne({
                        where: { dumpsterID },
                        transaction: t,
                    })
                )?.revisionID;
                return await DumpsterCategories.bulkCreate(
                    // @ts-ignore
                    categories.map(name => ({
                        categoryID: literal(
                            `(SELECT c.categoryID FROM Categories AS c WHERE c.name = ${sequelize.escape(
                                name,
                            )})`,
                        ),
                        dumpsterID,
                        revisionID,
                        name,
                    })),
                    { transaction: t },
                );
            });
        },
    };
}
