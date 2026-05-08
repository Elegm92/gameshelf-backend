import { Router } from 'express';
import { addGameToList, getUserList, removeGameFromList } from '../controllers/gameListController.js';

const router = Router();

router.post('/', addGameToList);
router.get('/:userId', getUserList);
router.delete('/:userId/:rawgId', removeGameFromList);

export default router;