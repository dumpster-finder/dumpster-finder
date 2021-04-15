declare module "express-pino-logger" {
    import { Handler } from "express";
    import { Logger } from "pino";

    const expressPino: (stuff: { logger: Logger }) => Handler;
    export default expressPino;
}
