import { Router } from "express";
import {getRandomGames,searchGames,getGameDetails} from "../controllers/gameController.js";

const router = Router();

router.get("/", getRandomGames);
router.get("/search", searchGames);
router.get("/:id", getGameDetails);

export default router;
