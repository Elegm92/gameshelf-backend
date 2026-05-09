import { Router } from "express";
import { getReviewLikes, addLike,removeLike } from "../controllers/likeController.js";

const router = Router();

router.get('/:reviewId', getReviewLikes);
router.post('/', addLike);
router.delete('/:userId/:reviewId', removeLike);

export default router;