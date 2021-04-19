import { dumpsterIDParam } from "./dumpsters";
import Joi from "joi";

export const getPhotos = {
    params: dumpsterIDParam,
};

export const postPhotos = {
    params: dumpsterIDParam,
    body: Joi.object({
        url: Joi.string()
            .uri({
                allowRelative: false,
                scheme: ["http", "https"],
            })
            .required(),
        userID: Joi.string().required(),
    }),
};
