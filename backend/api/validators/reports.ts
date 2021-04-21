import Joi from "joi";

export const postReport = {
    params: Joi.object({
        dumpsterID: Joi.string()
            .pattern(/(\d)+/)
            .required(),
    }),
    body: Joi.object({
        userID: Joi.string().required(),
        reason: Joi.string()
            .allow(null)
            .allow("")
            .optional(),
    }),
};

export const getReport = {
    params: Joi.object({
        dumpsterID: Joi.string()
            .pattern(/(\d)+/)
            .required(),
    }),
};
