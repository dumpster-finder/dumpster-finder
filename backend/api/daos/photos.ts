import { MyModels } from "../models";
import { PhotoAttributes } from "../models/Photos";
import Photo, { PostPhoto } from "../types/Photo";
import { InvalidKeyError, NotFoundError } from "../types/errors";
import { ForeignKeyConstraintError } from "sequelize";

const modelToPhoto = ({ photoID, url, dateAdded }: PhotoAttributes): Photo => ({
    photoID,
    url,
    dateAdded,
});

export default function({ Photos, DumpsterPositions, sequelize }: MyModels) {
    return {
        /**
         * Get photos for a given dumpster
         *
         * @param dumpsterID
         */
        getAll: (dumpsterID: number) =>
            sequelize.transaction(async t => {
                const dumpster = await DumpsterPositions.findOne({
                    where: { dumpsterID },
                    transaction: t,
                });
                if (!dumpster) throw new NotFoundError("No such dumpster");

                return await Photos.findAll({
                    where: { dumpsterID },
                    order: [["dateAdded", "DESC"]],
                    transaction: t,
                }).then(ps => ps.map(modelToPhoto));
            }),

        /**
         * Add a photo to a dumpster
         *
         * @param dumpsterID
         * @param photo
         */
        addOne: (dumpsterID: number, photo: PostPhoto) =>
            sequelize.transaction(async t => {
                await Photos.create(
                    {
                        dumpsterID,
                        ...photo,
                    },
                    { transaction: t },
                ).catch(e => {
                    // Throw a more precise error if possible
                    if (e instanceof ForeignKeyConstraintError) {
                        if (e.message.includes("dumpsterID"))
                            throw new NotFoundError("No such dumpster");
                        else throw new InvalidKeyError("No such user ID");
                    }
                    throw e;
                });
                // Get dateAdded back
                return await Photos.findOne({
                    where: {
                        dumpsterID,
                        ...photo,
                    },
                    transaction: t,
                });
            }),
    };
}
