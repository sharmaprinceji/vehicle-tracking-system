import express  from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { createUser, deleteUser, getUserById, getUsers } from "../controller/usercontroller.js";
import { loginUser, logoutUser } from "../controller/logincontroller.js";
import upload from "../middleware/upload.js";
import { userLimiter } from "../middleware/rateLimiter.js";


const router = express.Router();
router.get("/users", userLimiter, authMiddleware, getUsers);
router.get("/users/:id", userLimiter, authMiddleware, getUserById);
router.post("/users", userLimiter, upload.single("profilePic"), createUser);
router.get("/login", userLimiter, loginUser);
router.post("/logout", userLimiter, authMiddleware, logoutUser);
router.delete("/users/:id", userLimiter, authMiddleware, deleteUser);

export default router;