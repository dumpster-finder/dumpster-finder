import { MyModels } from "../models";

export default function ({ Tags, DumpsterTags, StandardTags }: MyModels) {
    return {
        /**
         * Find all standard types of contents,
         * to present to users when they wanna add contents.
         *
         * Returns a little more than just the name, in case we *need* more.
         */
        getStandardContentTypes: () =>
            StandardTags.findAll({
                include: {
                    model: Tags,
                    as: "tag",
                },
            }).then(data =>
                data.map(
                    // @ts-ignore
                    ({
                        tagID,
                        tag: { categoryID, name },
                    }: {
                        tagID: number;
                        tag: { categoryID: number; name: string };
                    }) => ({ contentID: tagID, categoryID, name }),
                ),
            ),

        /**
         * Find the registered contents of a dumpster
         *
         * @param dumpsterID
         */
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

        addOne: (dumpsterID: number) => null,
        updateOne: (dumpsterID: number) => null,
    };
}
