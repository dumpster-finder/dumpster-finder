import { MyModels } from "../models";
import { DumpsterTagAttributes } from "../models/DumpsterTags";
import Content from "../types/Content";

const contentAttributes = [
    "dumpsterID",
    "amount",
    "unit",
    "expiryDate",
    "foundDate",
    // avoiding DumpsterPositionDumpsterID, the unspeakable horror
];

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

/**
 * Maps the result of a create call to an actual Content object.
 */
const createResultToContent = (
    name: string,
    { amount, unit, expiryDate, foundDate }: DumpsterTagAttributes,
): Content => ({
    name,
    amount,
    unit,
    expiryDate,
    foundDate,
});

export default function ({
    Tags,
    DumpsterTags,
    StandardTags,
    sequelize,
}: MyModels) {
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
                attributes: contentAttributes,
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

        addOne: async (
            dumpsterID: number,
            content: Omit<Content, "foundDate">,
        ) => {
            const { name } = content;

            return await sequelize.transaction(async t => {
                // First, check if the content type already exists
                const match = await Tags.findOne({
                    where: { name },
                    transaction: t,
                });

                let tagID;
                if (match) {
                    // If it does, we have the content type ID
                    tagID = match.tagID;
                } else {
                    // Otherwise, we'll have to add a new content type
                    tagID = (
                        await Tags.create(
                            // TODO either scrap category binding or find a way to set it...
                            { categoryID: 1, name },
                            { transaction: t },
                        )
                    ).tagID;
                }

                // Create the content entry
                await DumpsterTags.create(
                    {
                        dumpsterID,
                        tagID,
                        ...content,
                    },
                    { transaction: t },
                );
                // Then fetch the current data to get its date...
                // (kinda cursed, I know)
                const result = await DumpsterTags.findOne({
                    attributes: contentAttributes,
                    where: {
                        dumpsterID,
                        tagID,
                    },
                    order: [["foundDate", "DESC"]],
                    transaction: t,
                });
                if (result) return createResultToContent(name, result);
                else throw new Error("No content was created, wth?");
            });
        },

        updateOne: (dumpsterID: number) => null,
    };
}
