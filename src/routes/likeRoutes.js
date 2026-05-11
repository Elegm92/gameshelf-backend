import { Router } from "express";
import verifyToken from "../middleware/authMiddleware.js";
import { getReviewLikes, addLike,removeLike } from "../controllers/likeController.js";

const router = Router();

router.get('/:reviewId', getReviewLikes);
router.post('/',verifyToken, addLike);
router.delete("/:reviewId", verifyToken, removeLike);

export default router;