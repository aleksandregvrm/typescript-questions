"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const AnswerSchema = new mongoose_1.default.Schema({
    option: {
        type: String,
        required: true
    },
    isCorrect: {
        type: Boolean,
        required: true
    }
});
const validateAnswersArray = function (answers) {
    return answers.length >= 3;
};
const QuestionSchema = new mongoose_1.default.Schema({
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
        type: [AnswerSchema],
        validate: [validateAnswersArray, "Please provide more than two answers"],
        required: [true, "Please Provide at least one answer"]
    }
}, { timestamps: true });
exports.default = mongoose_1.default.model("Question", QuestionSchema);
//# sourceMappingURL=QuestionsModel.js.map