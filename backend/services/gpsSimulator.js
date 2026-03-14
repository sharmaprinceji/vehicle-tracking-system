import Location from "../models/Location.js";
import redis from "../config/redis.js";

export const simulateGPS = (io, vehicles) => {

    // store vehicle ids in redis once
    vehicles.forEach(async (v) => {
        await redis.sadd("active:vehicles", v.vehicleId);
    });

    setInterval(async () => {

        const locations = [];

        for (let v of vehicles) {

            const lat = 28 + Math.random();
            const lng = 77 + Math.random();

            locations.push({
                vehicleId: v.vehicleId,
                lat,
                lng,
                timestamp: new Date()
            });
            console.log(`Simulated Location for Vehicle ${v.vehicleId}: (${lat.toFixed(4)}, ${lng.toFixed(4)})`);
            io.emit("vehicleLocation", {
                vehicleId: v.vehicleId,
                lat,
                lng
            });
        }

        await Location.insertMany(locations);

    }, 5000);
};