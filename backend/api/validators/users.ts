import Joi from "joi";


export const validateUser = {
    params: {
        userID: Joi.string(),
    },
};