"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const QuizSchema = new mongoose_1.default.Schema({
    questionType: {
        type: String,
        required: [true, "Please provide a question type"]
    },
    question: {
        type: String,
        minlength: [6, "Please provide a valid question"],
        maxlength: [600, "Name can not be more than 600 characters"],
        required: [true, "Please provide a Question"]
    },
    answers: {
        type: String,
        required: [true, "Please Provide at least one answer"]
    }
}, { timestamps: true });
exports.default = mongoose_1.default.model("Quiz", QuizSchema);
//# sourceMappingURL=QuizModel.js.map