import Joi from "joi";

const latitude = Joi.number().min(-90).max(90).required();
const longitude = Joi.number().min(-180).max(180).required();

const position = Joi.object({
    latitude,
    longitude,
});

/**
 * Validator for the params in a GET /dumpsters request
 */
export const locationParams = {
    query: Joi.object({
        latitude,
        longitude,
        radius: Joi.number(),
    }),
};

const baseDumpster = Joi.object().keys({
    position,
    name: Joi.string().required(),
    dumpsterType: Joi.string().required(),
    storeType: Joi.string().required(),
    locked: Joi.boolean().required(),
    positiveStoreViewOnDiving: Joi.boolean().optional(),
    emptyingSchedule: Joi.string().required(),
    cleanliness: Joi.number().min(1).max(5).required(),
});

const dumpsterIDParam = Joi.object({
    dumpsterID: Joi.string().pattern(/(\d)+/).required(),
});

/**
 * Validator for a *specific* dumpster request
 */
export const getDumpster = {
    params: dumpsterIDParam,
};

/**
 * Validator for a POSTed dumpster
 */
export const postDumpster = {
    body: baseDumpster,
};

/**
 * Validator for an updated dumpster (which already has an ID)
 */
export const putDumpster = {
    params: dumpsterIDParam,
    body: baseDumpster,
};
