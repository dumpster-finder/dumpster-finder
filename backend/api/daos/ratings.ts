import { MyModels } from "../models";
import {literal, Sequelize, Transaction} from "sequelize";
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
                        ...rating
                    },
                    {transaction: t},
                ).catch(_ => {
                    throw new ConflictError(
                        "A dumpster already exists at this position",
                    );
                });

            });
        },
        /**
         * update a rating to a dumpster, returning the inserted entity
         *
         * @param rating
         */

        updateOne: async (userID : number, dumpsterID : number, rating : number) => {
            return sequelize.transaction(async t => {
                // Check that the pair of revision and dumpster ID is valid
                const match = await Ratings.findOne({
                    where: {
                        userID,
                        dumpsterID,
                    },
                    transaction: t,
                });

                if (!match)
                    throw new InvalidKeyError(
                        "There is no rating for this dumpster from this user",
                    );
                return await Ratings.update(
                    {
                        rating,
                        date : Sequelize.fn('NOW').toString(),
                    },
                    {
                        where: {
                            userID,
                            dumpsterID,
                        },
                        transaction: t,
                    },
                );
            });
        },
    }
}