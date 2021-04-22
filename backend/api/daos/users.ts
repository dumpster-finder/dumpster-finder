import { MyModels } from "../models";
import { literal, Transaction, UniqueConstraintError } from "sequelize";
import { UserAttributes } from "../models/Users";
import { ConflictError, InvalidKeyError, NotFoundError } from "../types/errors";
import { hashUser, generateSalt, hashPassword } from "../utils/hashing";

export default function({ Users, sequelize }: MyModels) {
    return {
        /**
         * Posts a new user
         *
         * @param userName
         * @param salt
         * @param passwordHash
         * @return true or false depending on if it worked
         */
        postOne: async (
            userName: string,
            salt: string,
            passwordHash: string,
        ) => {
            // Perform transaction
            const dumpsterPosition = await Users.create({
                passwordHash,
                userName,
                salt,
            }).catch(e => {
                if (e instanceof UniqueConstraintError)
                    throw new ConflictError(
                        "A user with this hash already exists",
                    );
                else throw e;
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
        getOne: async (userWords: string) => {
            let userName = hashUser(userWords);
            // Does't Perform transaction, since nothing is getting written
            // Check that the userHash and the salted hash are both nice
            const match = await Users.findOne({
                where: {
                    userName,
                },
            });
            if (match != null) {
                const passwordHash = await hashPassword(match.salt, userWords);
                const validate = await Users.findOne({
                    where: {
                        passwordHash,
                    },
                });
                if (validate !== null) {
                    return validate.userID;
                } else {
                    throw new NotFoundError("No such user exists");
                }
            } else {
                throw new NotFoundError("No such user exists");
            }
        },
    };
}
