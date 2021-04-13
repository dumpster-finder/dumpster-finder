import Joi from "joi";

export const getPicture = {
    params: Joi.object({
        pictureID: Joi.string()
            .regex(/[a-zA-Z0-9]+\.(jpg|png)/)
            .required(),
        "0": Joi.string(), // WTF???
    }),
};

export const postPicture = {
    body: Joi.object({
        userID: Joi.string().alphanum(),
    }),
};
