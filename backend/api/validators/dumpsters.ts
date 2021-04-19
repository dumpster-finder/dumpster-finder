import Joi from "joi";

const latitude = Joi.number()
    .min(-90)
    .max(90)
    .required();
const longitude = Joi.number()
    .min(-180)
    .max(180)
    .required();

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
        radius: Joi.number().optional(),
        dateInterval: Joi.string().required(),
    }),
};

const baseDumpster = Joi.object().keys({
    dumpsterID: Joi.number()
        .positive()
        .optional(), // makes requests with a superfluous dumpsterID easier to handle TODO reconsider
    position,
    name: Joi.string().required(),
    dumpsterType: Joi.string().required(),
    storeType: Joi.string().required(),
    // TODO this is just a temporary solution
    categories: Joi.array()
        .has(Joi.string())
        .optional(),
    locked: Joi.boolean().required(),
    positiveStoreViewOnDiving: Joi.boolean()
        .allow(null)
        .required(),
    emptyingSchedule: Joi.string()
        .allow("")
        .required(),
    cleanliness: Joi.number()
        .min(1)
        .max(5)
        .required(),
    info: Joi.string()
        .allow("")
        .required(),
});

export const dumpsterIDParam = Joi.object({
    dumpsterID: Joi.string()
        .pattern(/(\d)+/)
        .required(),
});

/**
 * Validator for a *specific* dumpster request
 */
export const getDumpster = {
    params: dumpsterIDParam,
    query: Joi.object({
        visitSinceDate: Joi.string().required(),
    }),
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
    body: baseDumpster.keys({
        rating: Joi.number(),
        visits: Joi.number().integer(),
    }),
};

export const patchRevision = {
    params: dumpsterIDParam,
    body: Joi.object({
        revisionID: Joi.number()
            .positive()
            .required(),
    }),
};
