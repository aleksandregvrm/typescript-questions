import { Document, ObjectId, Types } from "mongoose"

// Question Model
export type AnswerSchemaType = {
    option: string,
    isCorrect: boolean
}
export interface QuestionSchemaInter extends Document {
    questionType: string,
    question: string,
    answers: AnswerSchemaType[]
}
// Question Model End

// User Model 
export interface UserSchemaInter extends Document {
    name: string;
    email: string;
    password: string;
    role: "admin" | "user";
    verificationToken?: string;
    isVerified: boolean;
    verifiedDate?: Date;

    comparePassword(candidatePassword: string): Promise<boolean>;
}
// User Model End

// Token Model
export interface TokenSchemaInter extends Document {
    refreshToken: string,
    ip: string,
    userAgent: string,
    isValid: boolean,
    expires: string,
    user: Types.ObjectId,
}
// Token Model End

// Quiz Stats Model

export type QuestionsUsedType = {
    question: string,
    answerSubmitted: string,
    answerIsTrue: boolean
}
export type LastQuizSchemaType = {
    lastQuizCorrectAnswers: number,
    lastQuizDoneDate: Date,
    questionsUsed: [QuestionsUsedType],
}
export interface QuizStatsSchemaInter extends Document {
    user: Types.ObjectId,
    quizDoneAmount: number,
    totalQuizPoints: number,
    lastQuizResult: [LastQuizSchemaType]
}
// Quiz Stats Model End
