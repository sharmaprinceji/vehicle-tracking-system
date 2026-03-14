import express from "express";
import { franchiseLimiter } from "../middleware/rateLimiter";
import { getFranchises } from "../controller/franchiseController";
import { cacheMiddleware } from "../middleware/cache.js";


const router = express.Router();

router.get(
    "/franchises",
    franchiseLimiter,
    cacheMiddleware("franchises", 300),
    getFranchises
);

export default router;