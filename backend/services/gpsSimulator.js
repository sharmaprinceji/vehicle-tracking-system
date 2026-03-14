import Location from "../models/Location.js";

export const simulateGPS = (io, vehicles) => {
    setInterval(async () => {
        for (let v of vehicles) {

            const lat = 28 + Math.random();
            const lng = 77 + Math.random();

            const location = new Location({
                vehicleId: v.vehicleId,
                lat,
                lng,
            });

            await location.save();

            io.emit("vehicleLocation", {
                vehicleId: v.vehicleId,
                lat,
                lng,
            });
        }
    }, 5000);
};