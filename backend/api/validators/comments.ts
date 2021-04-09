import Joi from "joi";

export const getComments = {
    params: Joi.object({
        dumpsterID: Joi.string().pattern(/(\d)+/).required(),
    }),
};

export const postComment = {
    body: Joi.object({
        dumpsterID: Joi.number().min(1).required(),
        nickname: Joi.string().required(),
        comment: Joi.string().required(),
    }),
};

export const updateComment = {
    params: Joi.object({
        dumpsterID: Joi.string().pattern(/(\d)+/).required(),
        commentID: Joi.string().pattern(/(\d)+/).required(),
    }),
    body: Joi.object({
        vote: Joi.number().min(-2).max(2).disallow(0).required(),
    }),
};
