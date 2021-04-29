import Joi from "joi";

export const userIDparams = Joi.object({
    userID: Joi.number().positive().required(),
    userName: Joi.string().required(),
});

export const validateUser = {
    params: userIDparams,
};