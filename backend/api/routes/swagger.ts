import {Router} from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

export default function () {
    const router = Router();
    const options = {
        definition: {
            openapi: "3.0.0",
            info: {
                title: "Dumpster Finder API",
                version: "0.1.0",
                description: "todo",
                // license: {
                //     name: "MIT",
                //     url: "https://spdx.org/licenses/MIT.html",
                // },
                // contact: {
                //     name: "",
                //     url: "",
                //     email: "",
                // },
            },
            servers: [
                {
                    url: "http://localhost:3000/",
                },
            ],
        },
        apis: ["./routes/*.ts"],
    };

    router.use("/", swaggerUI.serve, swaggerUI.setup(swaggerJSDoc(options)));
    return router;
}
