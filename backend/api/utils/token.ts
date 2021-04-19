import {encode, decode, TAlgorithm} from "jwt-simple";

const algorithm: TAlgorithm = "HS512";

export interface Session {
    id: number;
    /**
     * Timestamp indicating when the session should expire, in Unix milliseconds.
     */
    expires: number;
}

export type DecodeResult =
    | {
    type: "valid";
    session: Session;
}
    | {
    type: "integrity-error";
}
    | {
    type: "invalid-token";
};

export type ExpirationStatus = "expired" | "active" | "grace";

export function encodeToken(userID : number){
        // Always use HS512 to sign the token
        // Determine when the token should expire
        const issued = Date.now();
        const thirtyMinutesInMs = 30 * 60 * 1000;
        const expires = issued + thirtyMinutesInMs;
        const session:Session={
            id: userID,
            expires: expires
        }
        let token = encode(session, process.env.TOKEN_SECRET || "you should get a token secret", algorithm);
        return token

}

export function decodeToken(token : string): DecodeResult{
    let session: Session;
    try {
        session = decode(token,process.env.TOKEN_SECRET || "you should still get a token secret", false, algorithm )
    }
    catch (_e) {
        const e: Error = _e;

        // These error strings can be found here:
        // https://github.com/hokaccha/node-jwt-simple/blob/c58bfe5e5bb049015fcd55be5fc1b2d5c652dbcd/lib/jwt.js
        if (e.message === "No token supplied" || e.message === "Not enough or too many segments") {
            return {
                type: "invalid-token"
            };
        }

        if (e.message === "Signature verification failed" || e.message === "Algorithm not supported") {
            return {
                type: "integrity-error"
            };
        }

        // Handle json parse errors, thrown when the payload is nonsense
        if (e.message.indexOf("Unexpected token") === 0) {
            return {
                type: "invalid-token"
            };
        }

        throw e;
    }

    return{
        type: "valid",
        session: session
    }



}

function checkTokenTime(session: Session):ExpirationStatus{
    const now = Date.now();

    if (session.expires > now) return "active";

    // Find the timestamp for the end of the token's grace period
    const oneHourInMs = 1 * 60 * 60 * 1000;
    const oneHourAfterExpiration = session.expires + oneHourInMs;

    if (oneHourAfterExpiration > now) return "grace";

    return "expired";
}

import { Request, Response, NextFunction } from "express";

/**
 * Express middleware, checks for a valid JSON Web Token and returns 401 Unauthorized if one isn't found.
 */
export function JwtMiddleware(request: Request, response: Response, next: NextFunction) {
    const unauthorized = (message: string) => response.status(401).json({
        ok: false,
        status: 401,
        message: message
    });

    const requestHeader = "X-JWT-Token";
    const responseHeader = "X-Renewed-JWT-Token";
    const header = request.header(requestHeader);

    if (!header) {
        unauthorized(`Required ${requestHeader} header not found.`);
        return;
    }

    const decodedSession: DecodeResult = decodeToken(header);

    if (decodedSession.type === "integrity-error" || decodedSession.type === "invalid-token") {
        unauthorized(`Failed to decode or validate authorization token. Reason: ${decodedSession.type}.`);
        return;
    }

    const expiration: ExpirationStatus = checkTokenTime(decodedSession.session);

    if (expiration === "expired") {
        unauthorized(`Authorization token has expired. Please create a new authorization token.`);
        return;
    }

    let session: Session;

    if (expiration === "grace") {
        // Automatically renew the session and send it back with the response
        const token = encodeToken(decodedSession.session.id);
        session = {
            ...decodedSession.session,
        };

        response.setHeader(responseHeader, token);
    } else {
        session = decodedSession.session;
    }

    // Set the session on response.locals object for routes to access
    response.locals = {
        ...response.locals,
        session: session
    };

    // Request has a valid or renewed session. Call next to continue to the authenticated route handler
    next();
}