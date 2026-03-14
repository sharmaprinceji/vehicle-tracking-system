import express from "express";
import { vehicleLimiter } from "../middleware/rateLimiter.js";
import { cacheMiddleware } from "../middleware/cache.js";
import { getVehicles } from "../controller/vehicleController.js";


const router = express.Router();

const vehicleRoutes = (io) => {

  router.get(
    "/vehicles",
    vehicleLimiter,
    cacheMiddleware("vehicles", 120),
    getVehicles(io)
  );

  return router;
};

export default vehicleRoutes;