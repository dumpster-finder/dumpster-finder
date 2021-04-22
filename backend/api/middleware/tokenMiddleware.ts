/**
 * Largely from https://nozzlegear.com/blog/implementing-a-jwt-auth-system-with-typescript-and-node
 */

import { Request, Response, NextFunction } from "express";
import {
    decodeToken,
    encodeToken,
    DecodeResult,
    ExpirationStatus,
    Session,
    checkTokenTime,
} from "../utils/token";
import { logger } from "../server";
import { UnauthorizedError } from "../types/errors";

const requestHeader = "jwttoken";
/**
 * Express middleware, checks for a valid JSON Web Token and returns 401 Unauthorized if one isn't found.
 */
export function JwtMiddleware(
    request: Request,
    response: Response,
    next: NextFunction,
) {
    const unauthorized = (message: string) => {
        throw new UnauthorizedError(message);
    };

    const header = request.header(requestHeader);

    if (!header) {
        unauthorized(`Required ${requestHeader} header not found.`);
        return;
    }

    logger.info(`Token ${header}`);

    const decodedSession: DecodeResult = decodeToken(header);

    if (
        decodedSession.type === "integrity-error" ||
        decodedSession.type === "invalid-token"
    ) {
        unauthorized(
            `Failed to decode or validate authorization token. Reason: ${decodedSession.type}.`,
        );
        return;
    }

    const expiration: ExpirationStatus = checkTokenTime(decodedSession.session);

    if (expiration === "expired") {
        unauthorized(
            `Authorization token has expired. Please create a new authorization token.`,
        );
        return;
    }

    let session: Session;

    if (expiration === "grace") {
        // Automatically renew the session and send it back with the response
        const token = encodeToken(decodedSession.session.id);
        session = {
            ...decodedSession.session,
        };

        response.header("JWT-Renewed", token);
    } else {
        session = decodedSession.session;
    }

    // Set the session on response.locals object for routes to access
    response.locals = {
        ...response.locals,
        session: session,
    };

    // Request has a valid or renewed session. Call next to continue to the authenticated route handler
    next();
}
