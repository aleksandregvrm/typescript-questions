"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const QuestionsUsed = new mongoose_1.default.Schema({
    question: {
        type: String,
    },
    answerSubmitted: {
        type: String,
    },
    answerIsTrue: {
        type: Boolean
    }
});
const LastQuizSchema = new mongoose_1.default.Schema({
    lastQuizCorrectAnswers: {
        type: Number,
    },
    lastQuizDoneDate: {
        type: Date,
        required: true
    },
    questionsUsed: {
        type: [QuestionsUsed],
    }
});
const QuizStatsSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "User",
        required: true,
    },
    quizDoneAmount: {
        type: Number,
        required: [true, "Please provide how many quiz have you done"],
        default: 0
    },
    totalQuizPoints: {
        type: Number,
        minlength: [6, "Please provide a valid question"],
        maxlength: [600, "Name can not be more than 600 characters"],
        required: [true, "Please provide a Question"],
        default: 0
    },
    lastQuizResult: {
        type: [LastQuizSchema]
    }
}, { timestamps: true });
exports.default = mongoose_1.default.model("QuizStats", QuizStatsSchema);
//# sourceMappingURL=QuizStatsModel.js.map