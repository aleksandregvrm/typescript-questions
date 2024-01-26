import express from "express";
import { getAllQuestions, getSingleQuestion,uploadQuestion } from "../controllers/questionController";
const router = express.Router();

router.route("/").post(uploadQuestion).get(getAllQuestions);
router.route("/:id").get(getSingleQuestion);

export default router;