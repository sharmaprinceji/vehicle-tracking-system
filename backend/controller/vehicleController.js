import { fetchVehicles, getVehiclesFromDB } from "../services/apiService.js";
import Location from "../models/Location.js";
import { simulateGPS } from "../services/gpsSimulator.js";

export const getVehicles = (io) => async (req, res) => {
    try {
        console.log("Fetching vehicles...");
        //const vehicles = await fetchVehicles();
        const vehiclesFromDB = await getVehiclesFromDB();
        //console.log("Fetched vehicles:", vehicles);
        // console.log("Vehicles from DB:", vehiclesFromDB);
        simulateGPS(io, vehiclesFromDB);

        const enrichedVehicles = await Promise.all(
            vehiclesFromDB.map(async (v) => {
                const lastLocation = await Location.findOne({ vehicleId: v.vehicleId })
                    .sort({ timestamp: -1 });

                return {
                    ...v,
                    location: lastLocation || null,
                };
            })
        );

        res.json(enrichedVehicles);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};