import express from "express";
import { getVehicles } from "../controller/vehicleController.js";


const router = express.Router();

const vehicleRoutes = (io) => {
  router.get("/vehicles", getVehicles(io));
  return router;
};

export default vehicleRoutes;