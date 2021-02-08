import Joi from "joi";

export const postDumpster = {
    body: Joi.object({
        latitude: Joi.number().min(0).max(90).required(),
        longitude: Joi.number().min(0).max(90).required(),
        name: Joi.string(),
        type: Joi,
        storeType: Joi,
        locked: Joi.binary(),
        positiveViewOnDiving: Joi.binary().optional(),
        emptyingSchedule: Joi.string(),
        cleanliness: Joi.number().min(0).max(100),
    }),
};