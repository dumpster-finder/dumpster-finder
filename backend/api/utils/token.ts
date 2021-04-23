import { encode, decode, TAlgorithm } from "jwt-simple";

/** mostly from:
 * https://nozzlegear.com/blog/implementing-a-jwt-auth-system-with-typescript-and-node
 */
const algorithm: TAlgorithm = "HS512";
const ThirtyMinutesInMs = 30 * 60 * 1000;
const OneHourInMs = 1 * 60 * 60 * 1000;

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

export function encodeToken(userID: number) {
    // Always use HS512 to sign the token
    // Determine when the token should expire
    const issued = Date.now();
    const expires = issued + ThirtyMinutesInMs;
    const session: Session = {
        id: userID,
        expires: expires,
    };
    let token = encode(
        session,
        process.env.TOKEN_SECRET || "you should get a token secret",
        algorithm,
    );
    return token;
}

export function decodeToken(token: string): DecodeResult {
    let session: Session;
    try {
        session = decode(
            token,
            process.env.TOKEN_SECRET || "you should still get a token secret",
            false,
            algorithm,
        );
    } catch (_e) {
        const e: Error = _e;

        console.error(e);

        // These error strings can be found here:
        // https://github.com/hokaccha/node-jwt-simple/blob/c58bfe5e5bb049015fcd55be5fc1b2d5c652dbcd/lib/jwt.js
        if (
            e.message === "No token supplied" ||
            e.message === "Not enough or too many segments"
        ) {
            return {
                type: "invalid-token",
            };
        }

        if (
            e.message === "Signature verification failed" ||
            e.message === "Algorithm not supported"
        ) {
            return {
                type: "integrity-error",
            };
        }

        // Handle json parse errors, thrown when the payload is nonsense
        if (e.message.indexOf("Unexpected token") === 0) {
            return {
                type: "invalid-token",
            };
        }

        throw e;
    }

    return {
        type: "valid",
        session: session,
    };
}

export function checkTokenTime(session: Session): ExpirationStatus {
    const now = Date.now();

    if (session.expires > now) return "active";

    // Find the timestamp for the end of the token's grace period
    const oneHourAfterExpiration = session.expires + OneHourInMs;

    if (oneHourAfterExpiration > now) return "grace";

    return "expired";
}
