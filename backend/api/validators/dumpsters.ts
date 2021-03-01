import Joi from "joi";

const position = Joi.object({
    latitude: Joi.number().min(-90).max(90).required(),
    longitude: Joi.number().min(-180).max(180).required(),
});

/**
 * Validator for the params in a GET /dumpsters request
 */
export const locationParams = {
    params: Joi.object({
        position,
        radius: Joi.number(),
    }),
};

const baseDumpster = Joi.object().keys({
    position,
    name: Joi.string(),
    dumpsterType: Joi.string(),
    storeType: Joi.string(),
    locked: Joi.boolean(),
    positiveStoreViewOnDiving: Joi.boolean().optional(),
    emptyingSchedule: Joi.string(),
    cleanliness: Joi.number().min(1).max(5),
});

/**
 * Validator for a POSTed (or updated) dumpster
 */
export const postDumpster = {
    body: baseDumpster,
};

