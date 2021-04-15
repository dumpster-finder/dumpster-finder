import { MyModels } from "../models";
import { literal, Transaction } from "sequelize";
import Rating from "../types/Rating";
import { RatingAttributes } from "../models/Ratings";
import Position, { GeoJSONPoint, PositionParams } from "../types/Position";
import { ConflictError, InvalidKeyError } from "../types/errors";
/**
 * Add a dumpster to the database table.
 * When adding, the dumpster does not yet have an ID.
 * A rather complex routine since a revision must be created,
 * and the dumpster's current revision must be set to the one that was added.
 *
 * @param dumpster
 * @return The newly posted data, with an ID
 */
export default function ({
                             Ratings,
                             sequelize,
                         }: MyModels) {
    return {
        /**
         * Adds a rating to a dumpster, returning the inserted entity
         *
         * @param rating
         */

        addOne: async (rating: Omit<Rating, "date">) => {
            // Rewrite position data to GeoJSON format

            // Perform transaction
            return await sequelize.transaction(async t => {
                const dumpsterPosition = await Ratings.create(
                    {
                        position,
                    },
                    {transaction: t},
                ).catch(_ => {
                    throw new ConflictError(
                        "A dumpster already exists at this position",
                    );
                });

            });
        },
    }
}