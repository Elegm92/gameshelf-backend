import express from 'express';
import { getAllUsers, getUserById, createUser, updateUser } from '../controllers/userController.js';
const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);

export default router;