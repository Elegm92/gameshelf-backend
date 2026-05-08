import { Router } from 'express';
import { createReview, getGameReviews, getUserReviews, updateReview, deleteReview } from '../controllers/reviewController.js';

const router = Router();

router.post('/', createReview);
router.get('/game/:rawgId', getGameReviews);
router.get('/user/:userId', getUserReviews);
router.put('/:id', updateReview);
router.delete('/:id', deleteReview);

export default router;