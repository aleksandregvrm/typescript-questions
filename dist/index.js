"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// main imports
require("express-async-errors");
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// errors
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const notFound_1 = __importDefault(require("./middleware/notFound"));
// db
const connect_1 = __importDefault(require("./db/connect"));
// routes
const questionRoutes_1 = __importDefault(require("./routes/questionRoutes"));
const userRouter_1 = __importDefault(require("./routes/userRouter"));
const quizStatsRoutes_1 = __importDefault(require("./routes/quizStatsRoutes"));
const app = (0, express_1.default)();
app.use((0, express_mongo_sanitize_1.default)());
app.use(express_1.default.json());
app.use("/api/v1/products", questionRoutes_1.default);
app.use("/api/v1/auth", userRouter_1.default);
app.use("/api/v1/quizStats", quizStatsRoutes_1.default);
app.use(errorHandler_1.default);
app.use(notFound_1.default);
const port = 5002;
const start = async () => {
    try {
        await (0, connect_1.default)(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`the app is listening on port ${port}`);
        });
    }
    catch (error) {
        console.log(error);
    }
};
start();
//# sourceMappingURL=index.js.map