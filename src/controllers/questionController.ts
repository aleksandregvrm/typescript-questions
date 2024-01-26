import { Request, Response } from 'express';
import { SubmitQuestionType, allQuestionsType,QueryObjectType } from '../types/controllerTypes'
import Question from '../models/QuestionsModel';
import { StatusCodes } from 'http-status-codes';
import errorFunction from '../errors/errorFunction';

const getAllQuestions = async (req: Request, res: Response): Promise<void> => {
    
    const {questionType,search,quizMode} = req.query;
    let queryObject:QueryObjectType = {};
    if(questionType){
        queryObject.questionType = questionType as string;
    }
    if(search){
        queryObject.question = search as string;
    }
    let allQuestions:allQuestionsType = await Question.find(queryObject);
    if(quizMode){
        const questionsLength:number = allQuestions.length;
        const randomIndex:number = Math.floor(Math.random() * questionsLength);
        allQuestions = [allQuestions[randomIndex]];
    }
    res.status(StatusCodes.OK).json({questions:allQuestions})
}
const uploadQuestion = async (req: Request, res: Response): Promise<void> => {
    const {question,answers,questionType} = req.body;    
    if (!question || answers.length < 1 || !questionType) {
       errorFunction(res,"Please provide a valid values",StatusCodes.BAD_REQUEST);
    }
    const submitQuestion = await Question.create({question,answers,questionType});
    if(!submitQuestion){
        errorFunction(res,"Error with creating a question",StatusCodes.BAD_REQUEST)
    }
    res.status(StatusCodes.CREATED).json({ question: submitQuestion });
}

const getSingleQuestion = async (req: Request, res: Response): Promise<void> => {
    res.send('dachi ylea yle ylea gasagebia?')
}

const evaluateQuestion = async (req:Request,res:Response) : Promise<void> => {
  const {submittedAnswer,correctAnswer} = req.body;
  if(!submittedAnswer || !correctAnswer){
    errorFunction(res,"Error with evaluating your answers",StatusCodes.BAD_REQUEST);
  }
}

export { getSingleQuestion, getAllQuestions, uploadQuestion, evaluateQuestion };