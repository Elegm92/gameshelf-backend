import { Router } from 'express';
import verifyToken from "../middleware/authMiddleware.js";
import { addGameToList, getUserList, removeGameFromList } from '../controllers/gameListController.js';

const router = Router();


router.get('/:userId', getUserList);
router.post("/", verifyToken, addGameToList);
router.delete('/:rawgId',verifyToken, removeGameFromList);

export default router;