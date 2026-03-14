import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
        },

        role: {
            type: String,
            enum: ["admin", "user"],
            default: "user",
        },

        password: {
            type: String,
            required: true,
        },

        profilePic: {
            type: String,
            default: null,
        },

        refreshToken: {
            type: String,
            default: null,
        },

        tokenVersion: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

export default mongoose.model("User", userSchema);