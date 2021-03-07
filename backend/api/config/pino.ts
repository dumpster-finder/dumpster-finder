import { LoggerOptions } from "pino";

export const defaultLoggerOptions: LoggerOptions = {
    level: process.env.LOG_LEVEL || "info",
};
