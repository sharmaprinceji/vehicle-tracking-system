import rateLimit from "express-rate-limit";

export const apiLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 100, // max 100 requests per minute
    message: {
        status: 429,
        message: "Too many requests. Please try again later."
    },
    standardHeaders: true,
    legacyHeaders: false
});

export const vehicleLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 100,
    message: {
        message: "Too many vehicle requests, try again later"
    }
});

export const franchiseLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 20
});

export const userLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 50,
    message: {
        message: "Too many user requests"
    }
});