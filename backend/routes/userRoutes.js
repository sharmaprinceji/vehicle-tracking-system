import express  from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { createUser, deleteUser, getUserById, getUsers } from "../controller/usercontroller.js";
import { loginUser, logoutUser } from "../controller/logincontroller.js";
import upload from "../middleware/upload.js";


const router = express.Router();
router.get("/users", authMiddleware, getUsers);
router.get("/users/:id", authMiddleware, getUserById);
router.post("/users", upload.single("profilePic"), createUser);
router.get("/login",loginUser);
router.post("/logout", authMiddleware, logoutUser);
router.delete("/users/:id", authMiddleware,deleteUser);

export default router;