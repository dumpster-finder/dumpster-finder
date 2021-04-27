import Joi from "joi";

export const postReport = {
    params: Joi.object({
        dumpsterID: Joi.string()
            .pattern(/(\d)+/)
            .required(),
    }),
    body: Joi.object({
        reason: Joi.string()
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
