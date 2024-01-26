"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const nodemailerConfiguration_1 = require("./nodemailerConfiguration");
const sendEmail = async ({ to, subject, html }) => {
    let testAccount = await nodemailer_1.default.createTestAccount();
    const transporter = nodemailer_1.default.createTransport(nodemailerConfiguration_1.nodemailerConfig);
    return transporter.sendMail({
        from: '"Georgian Quiz App" <aleksandregvg@outlook.com>',
        to,
        subject,
        html,
    });
};
exports.default = sendEmail;
//# sourceMappingURL=sendEmail.js.map