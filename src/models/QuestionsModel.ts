import mongoose,{Schema} from "mongoose";
import { QuestionSchemaInter } from "../types/modelTypes";

const AnswerSchema = new Schema({
    option: {
        type: String,
        required: true
    },
    isCorrect: {
        type: Boolean,
        required: true
    }
});
const validateAnswersArray = function (answers:Record<symbol,string | boolean>[]):boolean {
    return answers.length >= 3;
};
const QuestionSchema = new mongoose.Schema(
    {
        questionType: {
            type:String,
            required:[true,"Please provide a question type"]
        },
        question: {
            type: String,
            minlength:[6, "Please provide a valid question"],
            maxlength: [600, "Name can not be more than 600 characters"],
            required: [true, "Please provide a Question"]
        },
        answers: {
            type: [AnswerSchema],
            validate:[validateAnswersArray, "Please provide more than two answers"],
            required: [true, "Please Provide at least one answer"]
        }
    },
    { timestamps: true }
);
export default mongoose.model<QuestionSchemaInter>("Question", QuestionSchema);