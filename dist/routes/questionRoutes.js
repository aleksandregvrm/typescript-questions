"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const questionController_1 = require("../controllers/questionController");
const router = express_1.default.Router();
router.route("/").post(questionController_1.uploadQuestion).get(questionController_1.getAllQuestions);
router.route("/:id").get(questionController_1.getSingleQuestion);
exports.default = router;
//# sourceMappingURL=questionRoutes.js.map