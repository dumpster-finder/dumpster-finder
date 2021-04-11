import Joi from "joi";

export const getPicture = {
    params: Joi.object({
        pictureID: Joi.string()
            .alphanum()
            .required(),
    }),
};

export const postPicture = {
    body: Joi.object({
        userID: Joi.string().alphanum(),
    }),
};
