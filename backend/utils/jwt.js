import jwt from "jsonwebtoken";

export const generateAccessToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            role: user.role,
            tokenVersion: user.tokenVersion,
        },
        process.env.JWT_SECRET || "princeKumar",
        { expiresIn: "15m" }
    );
};

export const generateRefreshToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            tokenVersion: user.tokenVersion,
        },
        process.env.REFRESH_SECRET || "princeKumarRefresh",
        { expiresIn: "7d" }
    );
};