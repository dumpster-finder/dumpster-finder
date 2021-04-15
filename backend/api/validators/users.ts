import Joi from "joi";

export const userIDparams = Joi.object({
    userID: Joi.string().required(),
});

export const validateUser = {
    params: userIDparams,
};