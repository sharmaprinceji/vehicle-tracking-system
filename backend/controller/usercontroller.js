import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";
import cloudinary from "../config/cloudnary.js";

export const getUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getUserById = async (req, res) => {
    try {

        const { id } = req.params;

        const user = await User.findById(id).select("-password");

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json(user);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const createUser = async (req, res) => {
    try {

        const { username, email, role, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        let profilePicUrl = null;

        // Upload image to Cloudinary
        if (req.file) {

            const result = await new Promise((resolve, reject) => {

                const stream = cloudinary.uploader.upload_stream(
                    { folder: "users" },
                    (error, result) => {
                        if (error) return reject(error);
                        resolve(result);
                    }
                );

                stream.end(req.file.buffer);

            });

            profilePicUrl = result.secure_url;
        }

        const newUser = new User({
            username,
            email,
            role,
            password: hashedPassword,
            profilePic: profilePicUrl
        });

        await newUser.save();

        const accessToken = generateAccessToken(newUser);
        const refreshToken = generateRefreshToken(newUser);

        newUser.refreshToken = refreshToken;
        await newUser.save();

        res.status(201).json({
            message: "User created successfully",
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                role: newUser.role,
                profilePic: newUser.profilePic
            },
            accessToken,
            refreshToken
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

export const deleteUser = async (req, res) => {

    try {

        const { id } = req.params;

        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "User deleted successfully" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};