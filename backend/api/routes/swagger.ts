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
                    // This depends on what host the server is deployed to
                    url: `http://${process.env.API_HOST}:${process.env.API_PORT}/`,
                },
            ],
        },
        apis: ["./routes/*.ts"],
    };

    router.use("/", swaggerUI.serve, swaggerUI.setup(swaggerJSDoc(options)));
    return router;
}
