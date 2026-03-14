import db from "../config/mysql.js";

export const getVehiclesFromDB = () => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM vehicles", (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};