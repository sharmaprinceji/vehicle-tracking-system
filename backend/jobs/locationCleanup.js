import cron from "node-cron";
import Location from "../models/Location.js";
import redis from "../config/redis.js";
import logger from "../utils/logger.js";

cron.schedule("*/5 * * * *", async () => {

    try {

        logger.info("Cron Job Started");

        // fetch vehicle ids stored in redis
        const vehicleIds = await redis.smembers("active:vehicles");

        if (!vehicleIds || vehicleIds.length === 0) {
            logger.info("No active vehicles found in Redis");
            return;
        }

        //const oneMinuteAgo = new Date(Date.now() - 60 * 1000);

        const result = await Location.deleteMany({
            vehicleId: { $in: vehicleIds },
        });

        console.log(`Cron Job: Deleted ${result.deletedCount} old location records`);
        logger.info(
            `Cron Job: Deleted ${result.deletedCount} old location records`
        );

    } catch (error) {

        logger.error(`Cron Job Error: ${error.message}`);

    }

});