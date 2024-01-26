"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutUser = exports.loginUser = exports.verifyUser = exports.registerUser = void 0;
const UserModel_1 = __importDefault(require("../models/UserModel"));
const http_status_codes_1 = require("http-status-codes");
const errorFunction_1 = __importDefault(require("../errors/errorFunction"));
const sendVerificationEmail_1 = __importDefault(require("../utils/sendVerificationEmail"));
const crypto_1 = __importDefault(require("crypto"));
const registerUser = async (req, res) => {
    const { email, password, name } = req.body;
    let role = "user";
    if (!email || !password || !name) {
        return (0, errorFunction_1.default)(res, "Please Provide Email,Password and Name", http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
    const firstTwoAccounts = (await UserModel_1.default.countDocuments({})) < 2;
    if (firstTwoAccounts) {
        role = "admin";
    }
    const verificationToken = crypto_1.default.randomBytes(40).toString("hex");
    const user = await UserModel_1.default.create({
        name,
        email,
        password,
        role,
        verificationToken,
    });
    const origin = "http://localhost:5002/api/v1/auth";
    await (0, sendVerificationEmail_1.default)({
        name: user.name,
        email: user.email,
        verificationToken: user.verificationToken,
        origin,
    });
    res.status(http_status_codes_1.StatusCodes.CREATED).json({ user: { name, email } });
};
exports.registerUser = registerUser;
const verifyUser = async (req, res) => {
    const { token: verificationToken, email } = req.query;
    const user = await UserModel_1.default.findOne({ email });
    if (!user) {
        return (0, errorFunction_1.default)(res, "Verification Failed", http_status_codes_1.StatusCodes.UNAUTHORIZED);
    }
    if (user.verificationToken !== verificationToken) {
        return (0, errorFunction_1.default)(res, "Verification Failed", http_status_codes_1.StatusCodes.UNAUTHORIZED);
    }
    user.isVerified = true;
    user.verifiedDate = new Date();
    user.verificationToken = "";
    await user.save();
    console.log('verification is a success');
    res.status(http_status_codes_1.StatusCodes.OK).json({ msg: "Email Verified" });
};
exports.verifyUser = verifyUser;
const loginUser = async (req, res) => {
    (0, errorFunction_1.default)(res, "You haven't provided values", http_status_codes_1.StatusCodes.BAD_REQUEST);
};
exports.loginUser = loginUser;
const logoutUser = async (req, res) => {
    (0, errorFunction_1.default)(res, "You haven't provided values", http_status_codes_1.StatusCodes.BAD_REQUEST);
};
exports.logoutUser = logoutUser;
//# sourceMappingURL=userController.js.map