import Joi from "joi";

export const postThing = {
    body: Joi.object({
        thing: Joi.string(),
        number: Joi.number().optional(),
    }),
};
