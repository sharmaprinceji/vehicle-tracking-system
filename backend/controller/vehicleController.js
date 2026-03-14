import { getVehiclesFromDB } from "../services/apiService.js";
import Location from "../models/Location.js";
import { simulateGPS } from "../services/gpsSimulator.js";

let gpsStarted = false;

export const getVehicles = (io) => async (req, res) => {
    try {

        const vehiclesFromDB = await getVehiclesFromDB();

        if (!gpsStarted) {
            simulateGPS(io, vehiclesFromDB);
            gpsStarted = true;
        }

        const enrichedVehicles = await Promise.all(
            vehiclesFromDB.map(async (v) => {

                const lastLocation = await Location.findOne({ vehicleId: v.vehicleId })
                .sort({ timestamp: -1 })
                .lean() ;

                // console.log(`Vehicle ${v.vehicleId} - Last Location:`, lastLocation);
                return {
                    ...v,
                    location: lastLocation || null
                };

            })
        );

        res.json(enrichedVehicles);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
