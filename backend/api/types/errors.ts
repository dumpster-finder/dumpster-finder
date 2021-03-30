export class APIError extends Error {
    readonly statusCode: number;
    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        this.name = "APIError";
    }
}

/**
 * Error tied to the 404 status code,
 * for use when there is no such resource (or no such *parent* resource)
 */
export class NotFoundError extends APIError {
    constructor(message: string) {
        super(message, 404);
        this.name = "NotFoundError";
    }
}

/**
 * Error tied to the 409 status code,
 * for use when there exists something with identical primary identifiers
 */
export class ConflictError extends APIError {
    constructor(message: string) {
        super(message, 409);
        this.name = "ConflictError";
    }
}

/**
 * Error tied to the 422 status code,
 * for use when e.g. there is no such dumpster type
 */
export class InvalidKeyError extends APIError {
    constructor(message: string) {
        super(message, 422);
        this.name = "InvalidKeyError";
    }
}
