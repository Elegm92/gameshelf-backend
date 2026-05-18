import express from 'express';
import verifyToken from "../middleware/authMiddleware.js";
import { upload } from '../config/cloudinary.js';
import { getAllUsers, getUserById, updateUser } from '../controllers/userController.js';
const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.put("/:id", verifyToken, upload.single("avatar"), updateUser);

export default router;