import Joi from "joi";

export const userIDparams = Joi.object({
    userID: Joi.string()
        .pattern(/\d+/)
        .required(),
});

export const validateUser = {
    params: userIDparams,
    body: Joi.object({
        userName: Joi.string(),
    }),
};
