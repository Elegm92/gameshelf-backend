import { Router } from "express";
import { registerUser, loginUser } from "../controllers/authController.js";

const router = Router();

//rutas login y register
router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
