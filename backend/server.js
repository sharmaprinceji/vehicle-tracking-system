import dotenv from "dotenv";
dotenv.config();

import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import router from "./routes/routes.js";
import "./config/mongo.js";
import "./config/mysql.js";
import "./jobs/locationCleanup.js";



const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

app.use(cors());
app.use(express.json());

app.use("/api", router(io));

server.listen(process.env.PORT, () => {
    console.log(`Server running on ${process.env.PORT}`);
});