import { MyModels } from "../models";

export default function ({ Tags, DumpsterTags, StandardTags }: MyModels) {
    return {
        getAll: (dumpsterID: number) =>
            DumpsterTags.findAll({
                where: { dumpsterID },
                attributes: [
                    "dumpsterID",
                    "amount",
                    "unit",
                    "expiryDate",
                    "foundDate",
                    // avoiding DumpsterPositionDumpsterID, the unspeakable horror
                ],
                include: [
                    {
                        model: Tags,
                        as: "tag",
                    },
                ],
            })
                .then(d => {
                    console.log(d);
                    // @ts-ignore
                    console.log(d[0].tag);
                    return d;
                })
                .then(data =>
                    data.map(
                        ({
                            amount,
                            unit,
                            expiryDate,
                            foundDate,
                            // @ts-ignore
                            tag,
                        }) => ({
                            // @ts-ignore
                            name: tag.dataValues.name,
                            amount,
                            unit,
                            expiryDate,
                            foundDate,
                        }),
                    ),
                ),
    };
}
