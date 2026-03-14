import express from "express";
import userRoutes from "./userRoutes.js";
import vehicleRoutes from "./vehicleRoutes.js";

const router = express.Router();

const MainRouter = (io) => {
    router.use("/user", userRoutes);
    router.use("/vehicle", vehicleRoutes(io));
    return router;
};

export default MainRouter;
