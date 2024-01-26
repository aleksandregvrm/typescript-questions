"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQuizStats = exports.evaluateQuizStats = void 0;
const evaluateQuizStats = async (req, res) => {
    const { quizCorrectAnswers, } = req.body;
    const { userId } = req.user;
    const userQuizStats = await quizStats.find({ id });
    const { quizDoneAmount, totalQuizPoints, lastQuizResult } = userQuizStats;
    const { lastQuizCorrectAnswers, lastQuizDoneDate, quiestionsUsed };
    const data = {
        user: 'asdas',
        quizDoneAmount: 19,
        totalQuizPoints: 120,
        averageQuizValue: (this.totalQuizPoints / (this.quizDoneAmount * 10)) * 10,
        lastQuizResult: {
            lastQuizCorrectAnswers: 7,
            lastQuizDoneDate: new Date(),
            questionsUsed: [
                {
                    question: 'dachi ylea',
                    answerSubmitted: 'ki',
                    answerIsTrue: false
                },
                {
                    question: 'dachi ylea',
                    answerSubmitted: 'ki',
                    answerIsTrue: false
                },
            ]
        }
    };
};
exports.evaluateQuizStats = evaluateQuizStats;
const getQuizStats = async (req, res) => {
    res.send('dachi ylea');
};
exports.getQuizStats = getQuizStats;
//# sourceMappingURL=quizStatsController.js.map