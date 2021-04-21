import Joi from "joi";

export const postVisit = {
    params: Joi.object({
        dumpsterID: Joi.string()
            .pattern(/(\d)+/)
            .required(),
    }),
};
