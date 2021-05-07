import {Logger} from "pino";
import {MyModels} from "./models";

/**
 * Dependencies that are injected into routes
 */
export interface RouteDependencies {
    logger: Logger,
    Models: MyModels
}
