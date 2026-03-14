import redis from "../config/redis.js";

export const cacheMiddleware = (prefix, expiry = 60) => {
    return async (req, res, next) => {

        const key = `${prefix}:${req.originalUrl}`;

        try {

            const cached = await redis.get(key);

            if (cached) {
                console.log("Cache HIT");
                return res.json(JSON.parse(cached));
            }

            const originalJson = res.json.bind(res);

            res.json = async (data) => {
                await redis.set(key, JSON.stringify(data), "EX", expiry);
                originalJson(data);
            };

            next();

        } catch (error) {
            console.log("Cache error", error);
            next();
        }
    };
};