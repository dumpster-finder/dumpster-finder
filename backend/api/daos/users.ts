import { MyModels } from "../models";
import {PositionParams} from "../types/Position";
import { literal, Transaction } from "sequelize";
import { UserAttributes } from "../models/Users";
import {ConflictError, InvalidKeyError} from "../types/errors";
import {hashUser, generateSalt, hashPassword} from "../utils/hashing";
import {logger} from "../server";

export default function ({ Users, sequelize }: MyModels) {
    return {
        /**
         * Fetches all dumpsters in a given radius around a position (lat, long)
         *
         * @param latitude
         * @param longitude
         * @param radius
         * @return The dumpsters that fit the query
         */
        postOne: async ( userName : string, salt : string, userID : string ) => {
            // Perform transaction
            await sequelize.transaction(async t => {
                const dumpsterPosition = await Users.create(
                    {
                        userID,
                        userName,
                        salt
                    },
                    { transaction: t },
                ).catch(_ => {
                    throw new ConflictError(
                        "A user with this hash already exists",
                    );
                });
                //this is probably redundant, but it's here now
                if(await dumpsterPosition){
                    return true;
                }
                else{
                    return false
                }

            });
        },
        /**
         * Fetches all dumpsters in a given radius around a position (lat, long)
         *
         * @param latitude
         * @param longitude
         * @param radius
         * @return The dumpsters that fit the query
         */
        checkOne: async ( userWords : string ) => {
            return sequelize.transaction(async t=> {
                // Perform transaction
                // Check that the pair of revision and dumpster ID is valid
                let userName = hashUser(userWords);
                logger.info(userName)
                const match = await Users.findOne({
                    where: {
                        userName,
                    },
                    transaction: t,
                });
                if(match != null){
                    const userID = hashPassword(match.salt, userWords);
                    const validate = await Users.findOne({
                        where: {
                            userID,
                        },
                        transaction: t,
                    });
                    if(validate != null){
                        return true
                    }
                    else{
                        return false
                    }
                }
                else {
                    throw new InvalidKeyError(
                        "There is no user with this ID",
                    );
                }
            });

        },

    };
}