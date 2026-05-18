import { Router } from 'express';
import verifyToken from "../middleware/authMiddleware.js";
import { createReview, getGameReviews, getUserReviews, updateReview, deleteReview } from '../controllers/reviewController.js';

const router = Router();


router.get('/game/:rawgId', getGameReviews);
router.get('/user/:userId', getUserReviews);
router.post("/", verifyToken, createReview);
router.put('/:id',verifyToken, updateReview);
router.delete("/:id", verifyToken,deleteReview);

export default router;