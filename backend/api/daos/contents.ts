import { MyModels } from "../models";
import { DumpsterContentsAttributes } from "../models/DumpsterContents";
import Content from "../types/Content";
import { NotFoundError, ServerError, UnknownError } from "../types/errors";

const contentAttributes = [
    "dumpsterID",
    "amount",
    "unit",
    "quality",
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
    quality,
    expiryDate,
    foundDate,
    contentType,
}: DumpsterContentsAttributes & {
    contentType: { name: string };
}): Content => ({
    name: contentType.name,
    amount,
    unit,
    quality,
    expiryDate,
    foundDate,
});

/**
 * Maps the result of a create call to an actual Content object.
 */
const createResultToContent = (
    name: string,
    {
        amount,
        unit,
        quality,
        expiryDate,
        foundDate,
    }: DumpsterContentsAttributes,
): Content => ({
    name,
    amount,
    unit,
    quality,
    expiryDate,
    foundDate,
});

export default function ({
    ContentTypes,
    DumpsterContents,
    StandardContentTypes,
    DumpsterPositions,
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
            StandardContentTypes.findAll({
                include: {
                    model: ContentTypes,
                    as: "contentType",
                },
            }).then(data =>
                data.map(
                    // @ts-ignore
                    ({
                        contentID,
                        // @ts-ignore
                        contentType: { categoryID, name },
                    }: {
                        contentID: number;
                        contentType: { categoryID: number; name: string };
                    }) => ({ contentID, categoryID, name }),
                ),
            ),

        /**
         * Find the registered contents of a dumpster
         *
         * @param dumpsterID - ID of the queried dumpster
         */
        getAll: async (dumpsterID: number) => {
            return await sequelize.transaction(async t => {
                const dumpsterPosition = await DumpsterPositions.findOne({
                    where: { dumpsterID },
                    transaction: t,
                });
                if (!dumpsterPosition)
                    throw new NotFoundError("No such dumpster");

                return await DumpsterContents.findAll({
                    where: { dumpsterID },
                    attributes: contentAttributes,
                    include: [
                        {
                            model: ContentTypes,
                            as: "contentType",
                        },
                    ],
                    order: [["foundDate", "DESC"]],
                    transaction: t,
                }).then(data =>
                    // @ts-ignore
                    data.map(toContent),
                );
            });
        },

        addOne: async (
            dumpsterID: number,
            content: Omit<Content, "foundDate">,
        ) => {
            const { name } = content;

            return await sequelize.transaction(async t => {
                // First, check if the content type already exists
                const match = await ContentTypes.findOne({
                    where: { name },
                    transaction: t,
                });

                let contentID;
                if (match) {
                    // If it does, we have the content type ID
                    contentID = match.contentID;
                } else {
                    // Otherwise, we'll have to add a new content type
                    contentID = (
                        await ContentTypes.create(
                            // TODO either scrap category binding or find a way to set it...
                            { categoryID: 1, name },
                            { transaction: t },
                        )
                    ).contentID;
                }

                // Create the content entry
                await DumpsterContents.create(
                    {
                        dumpsterID,
                        contentID,
                        ...content,
                    },
                    { transaction: t },
                );
                // Then fetch the current data to get its date...
                // (kinda cursed, I know)
                const result = await DumpsterContents.findOne({
                    attributes: contentAttributes,
                    where: {
                        dumpsterID,
                        contentID,
                    },
                    order: [["foundDate", "DESC"]],
                    transaction: t,
                });
                if (result) return createResultToContent(name, result);
                else
                    throw new UnknownError(
                        "Content was not created (for unknown reasons)",
                    );
            });
        },

        updateOne: async (dumpsterID: number, content: Content) => {
            const { name, foundDate, ...editableAttributes } = content;
            return await sequelize.transaction(async t => {
                const match = await ContentTypes.findOne({
                    where: { name },
                    transaction: t,
                });

                if (match) {
                    const { contentID } = match;
                    const [numberUpdated, _] = await DumpsterContents.update(
                        editableAttributes,
                        {
                            where: {
                                dumpsterID,
                                contentID,
                                foundDate,
                            },
                            transaction: t,
                        },
                    );
                    if (numberUpdated > 1)
                        throw new ServerError(
                            `Updated ${numberUpdated} content entries, but no more than one should be updated`,
                        );
                    const result = await DumpsterContents.findOne({
                        attributes: contentAttributes,
                        where: { dumpsterID, contentID, foundDate },
                        transaction: t,
                    });
                    if (result) return createResultToContent(name, result);
                    else
                        throw new NotFoundError(
                            "Couldn't find a content entry with this data",
                        );
                } else {
                    throw new NotFoundError("No such content type");
                }
            });
        },

        /**
         * Removes a content entry
         * @param dumpsterID - ID of the dumpster the content was found in
         * @param name       - content type, for identification
         * @param foundDate  - date found, for identification
         */
        removeOne: async (
            dumpsterID: number,
            { name, foundDate }: Pick<Content, "name" | "foundDate">,
        ) => {
            return await sequelize.transaction(async t => {
                const match = await ContentTypes.findOne({
                    where: { name },
                    transaction: t,
                });
                if (!match) throw new NotFoundError("No such content type");
                return await DumpsterContents.destroy({
                    where: {
                        dumpsterID,
                        contentID: match.contentID,
                        foundDate,
                    },
                });
            });
        },
    };
}
