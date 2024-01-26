// main imports
import 'express-async-errors';
import mongoSanitize from 'express-mongo-sanitize';
import cookieParser from 'cookie-parser';
import express, { Express } from 'express';
import dotenv from 'dotenv'
dotenv.config();

// errors
import handleAllErrors from './middleware/errorHandler';
import notFound from './middleware/notFound';

// db
import connectDB from './db/connect';

// routes
import questionsRouter from './routes/questionRoutes';
import userRouter from './routes/userRouter';
import quizStatsRouter from './routes/quizStatsRoutes';

const app:Express = express();

app.use(mongoSanitize());
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
console.log((req,res,next)=>{
    console.log(req.signedCookies);
    
});



app.use("/api/v1/products", questionsRouter);
app.use("/api/v1/auth",userRouter);
app.use("/api/v1/quizStats",quizStatsRouter);

app.use(handleAllErrors)
app.use(notFound)

const port: number = 5002;
const start = async (): Promise<void> => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`the app is listening on port ${port}`);
        });
    } catch (error) {
        console.log(error);
    }
};
start();