import Joi from "joi";
import { dumpsterIDParam } from "./dumpsters";

export const getContent = {
    params: dumpsterIDParam,
};

/**
 * Validator for POSTing contents
 * A new content entry has no found date
 */
export const postContent = {
    params: dumpsterIDParam,
    body: Joi.object({
        name: Joi.string().required(),
        amount: Joi.number().allow(null).optional(),
        unit: Joi.string().allow(null).optional(),
        quality: Joi.number().min(1).max(5).allow(null).optional(),
        expiryDate: Joi.date().allow(null).optional(),
    }),
};

/**
 * Validator for PUTting contents
 * An updated content entry has a found date
 */
export const putContent = {
    params: Joi.object({
        dumpsterID: Joi.string().pattern(/\d+/).required(),
        contentType: Joi.string().required(),
        foundDate: Joi.date().required(),
    }),
    body: Joi.object({
        name: Joi.string().required(),
        amount: Joi.number().allow(null).optional(),
        unit: Joi.string().allow(null).optional(),
        quality: Joi.number().min(1).max(5).allow(null).optional(),
        expiryDate: Joi.date().allow(null).optional(),
        foundDate: Joi.date().required(),
    }),
};

export const deleteContent = {
    params: Joi.object({
        dumpsterID: Joi.string().pattern(/\d+/).required(),
        contentType: Joi.string().required(),
        foundDate: Joi.date().required(),
    }),
};
