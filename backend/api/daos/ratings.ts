import { MyModels } from "../models";
import {literal, Sequelize, Transaction} from "sequelize";
import Rating from "../types/Rating";
import { RatingAttributes } from "../models/Ratings";
import Position, { GeoJSONPoint, PositionParams } from "../types/Position";
import { ConflictError, InvalidKeyError } from "../types/errors";
import {logger} from "../server";
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
         * @param dumpsterID
         * @param rating
         * @param userID
         */

        addOne: async (dumpsterID : number, rating : number, userID : number ) => {
            // Perform transaction
            return await sequelize.transaction(async t => {
                return await Ratings.create(
                    {
                        dumpsterID,
                        rating,
                        userID
                    },
                    {transaction: t},
                ).catch(_ => {
                    throw new ConflictError(
                        "A rating already exists for this dumpster by this user",
                    );
                });

            });
        },
        /**
         * update a rating to a dumpster, returning the inserted entity
         *
         * @param userID
         * @param dumpsterID
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
                const updatedRating = await Ratings.update(
                    {
                        rating,
                    },
                    {
                        where: {
                            userID,
                            dumpsterID,
                        },
                        transaction: t,
                    },
                );
                if(!updatedRating) return false;
                else return true;
            });
        },
    }
}