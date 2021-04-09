export class APIError extends Error {
    readonly statusCode: number;
    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        this.name = "APIError";
    }
}

/**
 * Error tied to the 400 status code,
 * for use when a DAO discovers invalid data
 */
export class InvalidDataError extends APIError {
    constructor(message: string) {
        super(message, 400);
        this.name = "InvalidDataError";
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

/**
 * Error tied to the 422 status code,
 * for use when you don't know exactly what went wrong,
 * but you *do* know that it's probably the client's fault
 * (thus, the API is unable to process this particular request)
 */
export class UnknownError extends APIError {
    constructor(message: string) {
        super(message, 422);
        this.name = "UnknownError";
    }
}

/**
 * Error tied to the 422 status code,
 * for use when you don't know exactly what went wrong,
 * and you're pretty sure it's *your* fault
 */
export class ServerError extends APIError {
    constructor(message: string) {
        super(message, 500);
        this.name = "ServerError";
    }
}
