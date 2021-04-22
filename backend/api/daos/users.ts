import { MyModels } from "../models";
import { literal, Transaction } from "sequelize";
import { UserAttributes } from "../models/Users";
import {ConflictError, InvalidKeyError} from "../types/errors";
import {hashUser, generateSalt, hashPassword} from "../utils/hashing";

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
                const dumpsterPosition = await Users.create(
                    {
                        userID,
                        userName,
                        salt
                    },
                ).catch(_ => {
                    throw new ConflictError(
                        "A user with this hash already exists",
                    );
                    return false;
                });
                //this is probably redundant, but it's here now
                return dumpsterPosition !== null;

        },
        /**
         * validates the user input to see if it's accurate
         *
         * @param userWords
         * @return if the user exists
         */
        getOne: async ( userWords : string ) => {
            let userName = hashUser(userWords);
                // Does't Perform transaction, since nothing is getting written
                // Check that the userHash and the salted hash are both nice
                const match = await Users.findOne({
                    where: {
                        userName,
                    },
                });
                if(match != null){
                    const userID = await hashPassword(match.salt, userWords);
                    const validate = await Users.findOne({
                        where: {
                            userID,
                        },
                    });
                    return validate !== null;
                }
                else {
                    return false
                }
        },

    };
}