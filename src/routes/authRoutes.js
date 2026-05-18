import { Router } from "express";
import {registerUser, loginUser, me, logoutUser} from "../controllers/authController.js";
import verifyToken from "../middleware/authMiddleware.js";

const router = Router();

//rutas login y register
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", verifyToken, me);
router.post("/logout", verifyToken, logoutUser);

export default router;
