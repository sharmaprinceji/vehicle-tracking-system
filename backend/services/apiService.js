import axios from "axios";

const BASE_URL = "http://52.195.7.84:3030/api/pda/admin";

const headers = {
    "x-api-key": "GTP_2026_PDA_V1_API_KEY_ASDF",
};

export const fetchFranchises = async () => {
    const res = await axios.post(`${BASE_URL}/franchises/list`, {}, { headers });
    return res.data;
};

export const fetchVehicles = async () => {
    const res = await axios.post(`${BASE_URL}/vehicles/list`, {}, { headers });
    return res.data;
};

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