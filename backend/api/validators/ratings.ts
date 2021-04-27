import Joi from "joi";
import {dumpsterIDParam} from "./dumpsters"

/**
 * Validator for dumpsterID
 */

export const addRatings = {
    params: dumpsterIDParam,
    body: Joi.object({
        rating: Joi.number().min(1)
            .max(5)
            .required(),
    }),
};