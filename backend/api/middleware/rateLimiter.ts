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
    max: 30,
    message: "Too many requests from this IP, please try again in 10 minutes",
});

/**
 * Rate limiter middleware for POST, PUT, PATCH requests
 */
export const updateLimiter = rateLimit({
    windowMs: 60 * 60_1000, // 60 mins
    max: 30,
    message:
        "Too many modifying requests from this IP, please try again in an hour",
});
