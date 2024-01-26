import mongoose,{ Schema } from "mongoose";

const QuestionsUsed = new Schema({
    question:{
        type:String,
    },
    answerSubmitted:{
        type:String,
    },
    answerIsTrue: {
        type:Boolean
    }
});
const LastQuizSchema = new mongoose.Schema({
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
const QuizStatsSchema = new mongoose.Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        quizDoneAmount: {
            type: Number,
            required: [true, "Please provide how many quiz have you done"],
            default:0
        },
        totalQuizPoints: {
            type: Number,
            minlength: [6, "Please provide a valid question"],
            maxlength: [600, "Name can not be more than 600 characters"],
            required: [true, "Please provide a Question"],
            default:0
        },
        lastQuizResult: {
            type:[LastQuizSchema]
        }
    },
    { timestamps: true }
);
export default mongoose.model("QuizStats", QuizStatsSchema);