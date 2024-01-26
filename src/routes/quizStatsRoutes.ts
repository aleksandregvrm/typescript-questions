import express from "express";
import { evaluateQuizStats,getQuizStats } from "../controllers/quizStatsController";
const router = express.Router();

router.route("/").post(evaluateQuizStats);
router.route("/evaluate").get(getQuizStats);

export default router;