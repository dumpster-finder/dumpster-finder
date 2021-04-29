import rateLimit from "express-rate-limit";

// TODO check if this is necessary when using Nginx:
// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
// app.set('trust proxy', 1);

/**
 * Rate limiter middleware for GET requests
 */
export const standardLimiter = rateLimit({
    windowMs: 10 * 60_1000, // 10 mins
    max: 300,
    message: "Too many requests from this IP, please try again in 10 minutes",
});

/**
 * Rate limiter middleware for POST, PUT, PATCH requests
 */
export const updateLimiter = rateLimit({
    windowMs: 30 * 60_1000, // 60 mins
    max: 150,
    message:
        "Too many modifying requests from this IP, please try again in half an hour",
});

/**
 * Rate limiter middleware for up-/downvoting comments
 */
export const voteLimiter = rateLimit({
    windowMs: 30 * 60_1000, // 60 mins
    max: 300,
    message:
        "Too many modifying requests from this IP, please try again in half an hour",
});
