"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluateQuestion = exports.uploadQuestion = exports.getAllQuestions = exports.getSingleQuestion = void 0;
const QuestionsModel_1 = __importDefault(require("../models/QuestionsModel"));
const http_status_codes_1 = require("http-status-codes");
const errorFunction_1 = __importDefault(require("../errors/errorFunction"));
const getAllQuestions = async (req, res) => {
    console.log(Date.now());
    const { questionType, search, quizMode } = req.query;
    let queryObject = {};
    if (questionType) {
        queryObject.questionType = questionType;
    }
    if (search) {
        queryObject.question = search;
    }
    let allQuestions = await QuestionsModel_1.default.find(queryObject);
    if (quizMode) {
        const questionsLength = allQuestions.length;
        const randomIndex = Math.floor(Math.random() * questionsLength);
        allQuestions = [allQuestions[randomIndex]];
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({ questions: allQuestions });
};
exports.getAllQuestions = getAllQuestions;
const uploadQuestion = async (req, res) => {
    const { question, answers, questionType } = req.body;
    if (!question || answers.length < 1 || !questionType) {
        (0, errorFunction_1.default)(res, "Please provide a valid values", http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
    const submitQuestion = await QuestionsModel_1.default.create({ question, answers, questionType });
    if (!submitQuestion) {
        (0, errorFunction_1.default)(res, "Error with creating a question", http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
    res.status(http_status_codes_1.StatusCodes.CREATED).json({ question: submitQuestion });
};
exports.uploadQuestion = uploadQuestion;
const getSingleQuestion = async (req, res) => {
    res.send('dachi ylea yle ylea gasagebia?');
};
exports.getSingleQuestion = getSingleQuestion;
const evaluateQuestion = async (req, res) => {
    const { submittedAnswer, correctAnswer } = req.body;
    if (!submittedAnswer || !correctAnswer) {
        (0, errorFunction_1.default)(res, "Error with evaluating your answers", http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
};
exports.evaluateQuestion = evaluateQuestion;
//# sourceMappingURL=questionController.js.map