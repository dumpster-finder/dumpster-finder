import {Logger} from "pino";

/**
 * Dependencies that are injected into routes
 */
export interface RouteDependencies {
    logger: Logger
}
