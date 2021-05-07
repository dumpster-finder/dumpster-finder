import rateLimit from "express-rate-limit";

/**
 * Rate limiter middleware for GET requests
 */
export const standardLimiter = rateLimit({
    windowMs: 10 * 60_1000, // 10 mins
    max: 300,
    message: "Too many requests from this IP, please try again in 10 minutes",
});

/**
 * Rate limiter middleware for POST and DELETE requests
 */
export const updateLimiter = rateLimit({
    windowMs: 30 * 60_1000, // 60 mins
    max: 75,
    message:
        "Too many modifying requests from this IP, please try again in half an hour",
});
