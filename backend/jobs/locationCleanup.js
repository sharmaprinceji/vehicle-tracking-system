import cron from "node-cron";
import Location from "../models/Location.js";
import logger from "../utils/logger.js";

cron.schedule("*/5 * * * *", async () => {

    try {

        const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

        const result = await Location.deleteMany({
            timestamp: { $lt: oneHourAgo },
        });

        logger.info(`Cron Job: Deleted ${result.deletedCount} old location records`);

    } catch (error) {

        logger.error(`Cron Job Error: ${error.message}`);

    }

});