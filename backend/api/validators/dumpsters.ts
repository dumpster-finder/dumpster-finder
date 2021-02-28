import Joi from "joi";

/**
 * Validator for the params in a GET /dumpsters request
 */
export const locationParams = {
    params: Joi.object({
        position: Joi.object({
            latitude: Joi.number().min(-90).max(90).required(),
            longitude: Joi.number().min(-180).max(180).required(),
        }),
        radius: Joi.number(),
    }),
};

const baseDumpster = Joi.object().keys({
    position: Joi.object({
        latitude: Joi.number().min(-90).max(90).required(),
        longitude: Joi.number().min(-180).max(180).required(),
    }),
    name: Joi.string(),
    dumpsterType: Joi.string(),
    storeType: Joi.string(),
    locked: Joi.boolean(),
    positiveStoreViewOnDiving: Joi.boolean().optional(),
    emptyingSchedule: Joi.string(),
    cleanliness: Joi.number().min(1).max(5),
});

/**
 * Validator for a POSTed dumpster
 */
export const postDumpster = {
    body: baseDumpster,
};

/**
 * Validator for a PUT dumpster
 */
export const putDumpster = {
    body: baseDumpster.keys({
        dumpsterID: Joi.number(), // does not work?
    }),
};
