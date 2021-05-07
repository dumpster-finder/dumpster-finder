import { Router } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

export default function() {
    const router = Router();
    const options = {
        definition: {
            openapi: "3.0.0",
            info: {
                title: "Dumpster Finder Picture API",
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
                    url:
                        process.env.PIC_URL ||
                        `http://${process.env.PIC_HOST}:${process.env.PIC_PORT}/pic/`,
                },
            ],
        },
        apis: ["./routes/*.ts"],
    };

    router.use("/", swaggerUI.serve, swaggerUI.setup(swaggerJSDoc(options)));
    return router;
}
