import Joi from "joi";

export const postVisit = {
    params: Joi.object({
        dumpsterID: Joi.string()
            .pattern(/(\d)+/)
            .required(),
    }),
    body: Joi.object({
        userID: Joi.number().required(),
    }),
};
