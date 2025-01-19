import express from "express";
import playerController from "../controllers/playerController.js";

const router = express.Router();

router.post("/players", playerController.createPlayer);
router.get("/players", playerController.getAllPlayers);
router.get("/players/:id", playerController.getPlayerById);
router.put("/players/:id", playerController.updatePlayer);
router.delete("/players/:id", playerController.deletePlayer);

export default router;
