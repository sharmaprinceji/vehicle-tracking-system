import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";

export const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const valid = await bcrypt.compare(password, user.password);

        if (!valid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        user.refreshToken = refreshToken;
        await user.save();

        res.json({
            accessToken,
            refreshToken,
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const refreshToken = async (req, res) => {

    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(401).json({ message: "Refresh token required" });
    }

    try {

        const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);

        const user = await User.findById(decoded.id);

        if (!user || user.refreshToken !== refreshToken) {
            return res.status(403).json({ message: "Invalid refresh token" });
        }

        const newAccessToken = generateAccessToken(user);

        res.json({ accessToken: newAccessToken });

    } catch (error) {
        res.status(403).json({ message: "Invalid refresh token" });
    }
};

export const logoutUser = async (req, res) => {

    const user = await User.findById(req.user._id);

    user.tokenVersion += 1;
    user.refreshToken = null;

    await user.save();

    res.json({ message: "Logged out successfully" });
};