import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// console.log("mongo URI:", process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI || "mongodb+srv://princesh1411:nrWrqm1h4YAeTboW@student.ypyyoou.mongodb.net/gps_tracking")

mongoose.connection.on("connected", () => {
  console.log("MongoDB Connected");
});

mongoose.connection.on("error", (err) => {
  console.log("MongoDB Error:", err);
});