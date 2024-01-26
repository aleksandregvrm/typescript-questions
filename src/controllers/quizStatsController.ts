import { Request, Response } from "express";
import QuizStats from "../models/QuizStatsModel";

const evaluateQuizStats = async (req: Request, res: Response): Promise<void> => {
    const { quizCorrectAnswers, } = req.body;
    // const {userId} = req.user
    // const userQuizStats = await quizStats.find({id});
    // const {quizDoneAmount,totalQuizPoints,lastQuizResult} = userQuizStats;
    // const {lastQuizCorrectAnswers,lastQuizDoneDate,questionsUsed} = lastQuizResult;
    
    // const data = {
    //     user: 'asdas',
    //     quizDoneAmount: 19,
    //     totalQuizPoints: 120,
    //     averageQuizValue: (this.totalQuizPoints / (this.quizDoneAmount * 10)) * 10,
    //     lastQuizResult: {
    //         lastQuizCorrectAnswers: 7,
    //         lastQuizDoneDate: new Date(),
    //         questionsUsed: [
    //             {
    //                 question: 'dachi ylea',
    //                 answerSubmitted:'ki',
    //                 answerIsTrue:false
    //             },
    //             {
    //                 question: 'dachi ylea',
    //                 answerSubmitted:'ki',
    //                 answerIsTrue:false
    //             },
    //         ]
    //     }
    // }
}
const getQuizStats = async (req:Request,res:Response) : Promise<void> => {
 res.send('dachi ylea');
}
export { evaluateQuizStats,getQuizStats }