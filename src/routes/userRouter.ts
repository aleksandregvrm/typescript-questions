import express from 'express';
import { registerUser,verifyUser } from "../controllers/userController";
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/verify-email").post(verifyUser);

export default router;