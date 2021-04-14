import { MyModels } from "../models";
import { literal, Transaction } from "sequelize";
import { UserAttributes } from "../models/Users";
import {ConflictError, InvalidKeyError} from "../types/errors";
import {hashUser, generateSalt, hashPassword} from "../utils/hashing";
import {logger} from "../server";

export default function ({ Users, sequelize }: MyModels) {
    return {
        /**
         * Posts a new user
         *
         * @param userName
         * @param salt
         * @param userID
         * @return true or false depending on if it worked
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
                if(dumpsterPosition.salt != null){
                    return true;
                }
                else{
                    return false
                }

            });
        },
        /**
         * validates the user input to see if it's accurate
         *
         * @param userWords
         * @return if the user exists
         */
        getOne: async ( userWords : string ) => {
            return sequelize.transaction(async t=> {
                // Perform transaction
                // Check that the pair of revision and dumpster ID is valid
                logger.info(userWords);
                let userName = hashUser(userWords);
                logger.info(userName)
                const match = await Users.findOne({
                    where: {
                        userName,
                    },
                    transaction: t,
                });
                if(match != null){
                    logger.info(match.salt);
                    logger.info(userWords);
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
                    return false
                }
            });

        },

    };
}