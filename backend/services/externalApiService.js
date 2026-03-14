import axios from "axios";
import db from "../config/mysql.js";

/* ===============================
   External API Configuration
================================ */

const BASE_URL = "http://52.195.7.84:3030/api/pda/admin";

const headers = {
    "x-api-key": "GTP_2026_PDA_V1_API_KEY_ASDF"
};

/* ===============================
   Fetch Franchises From External API
================================ */

export const fetchFranchises = async () => {
    try {

        const res = await axios.post(
            `${BASE_URL}/franchises/list`,
            {},
            { headers }
        );

        return res.data;

    } catch (error) {

        console.error("Error fetching franchises:", error.message);
        throw error;

    }
};

/* ===============================
   Fetch Vehicles From External API
================================ */

export const fetchVehicles = async () => {
    try {

        const res = await axios.post(
            `${BASE_URL}/vehicles/list`,
            {},
            { headers }
        );

        return res.data;

    } catch (error) {

        console.error("Error fetching vehicles:", error.message);
        throw error;

    }
};

/* ===============================
   Store Vehicles in MySQL
================================ */

export const saveVehiclesToDB = (vehicles) => {

    return new Promise((resolve, reject) => {

        const query = `
      INSERT INTO vehicles
      (vehicleId, type, status, assignedPdaId)
      VALUES ?
    `;

        const values = vehicles.map(v => [
            v.vehicleId,
            v.type,
            v.status,
            v.assignedPdaId
        ]);

        db.query(query, [values], (err, result) => {

            if (err) {
                console.error("Error saving vehicles:", err);
                reject(err);
            } else {
                resolve(result);
            }

        });

    });

};

/* ===============================
   Fetch Vehicles From MySQL
================================ */

export const getVehiclesFromDB = () => {

    return new Promise((resolve, reject) => {

        db.query(
            "SELECT * FROM vehicles",
            (err, results) => {

                if (err) {
                    console.error("Error fetching vehicles:", err);
                    reject(err);
                } else {
                    resolve(results);
                }

            }
        );

    });

};