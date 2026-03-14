import { fetchFranchises } from "../services/externalApiService.js";

export const getFranchises = async (req, res) => {
    try {

        const data = await fetchFranchises();

        res.json({
            success: true,
            data
        });

    } catch (error) {
        res.status(500).json({
            message: "Error fetching franchises"
        });
    }
};