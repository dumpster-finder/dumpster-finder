import { MyModels } from "../models";
import { DumpsterTagAttributes } from "../models/DumpsterTags";
import Content from "../types/Content";

/**
 * Maps the result of a findAll to an actual Content object.
 */
const toContent = ({
    amount,
    unit,
    expiryDate,
    foundDate,
    tag,
}: DumpsterTagAttributes & { tag: { name: string } }): Content => ({
    name: tag.name,
    amount,
    unit,
    expiryDate,
    foundDate,
});

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
         * @param dumpsterID - ID of the queried dumpster
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
            }).then(data =>
                // @ts-ignore
                data.map(toContent),
            ),

        addOne: (dumpsterID: number) => null,
        updateOne: (dumpsterID: number) => null,
    };
}
