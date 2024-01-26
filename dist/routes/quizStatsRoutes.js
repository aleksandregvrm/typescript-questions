"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const quizStatsController_1 = require("../controllers/quizStatsController");
const router = express_1.default.Router();
router.route("/").post(quizStatsController_1.evaluateQuizStats);
router.route("/evaluate").get(quizStatsController_1.getQuizStats);
exports.default = router;
//# sourceMappingURL=quizStatsRoutes.js.map