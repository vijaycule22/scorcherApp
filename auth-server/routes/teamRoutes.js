import express from "express";
import teamController from "../controllers/teamController.js";

const router = express.Router();

router.post("/teams", teamController.createTeam);
router.get("/teams", teamController.getAllTeams);
router.get("/teams/:id", teamController.getTeamById);
router.put("/teams/:id", teamController.updateTeam);
router.delete("/teams/:id", teamController.deleteTeam);

export default router;
