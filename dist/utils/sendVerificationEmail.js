"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sendEmail_1 = __importDefault(require("./sendEmail"));
const sendVerificationEmail = async ({ name, email, verificationToken, origin }) => {
    const verifyEmail = `${origin}/verify-email?token=${verificationToken}&email=${email}`;
    const message = `<p>Please confirm your email by clicking on the following link : 
  <a href="${verifyEmail}">Verify Email</a> </p>`;
    return (0, sendEmail_1.default)({
        to: email,
        subject: "Email Confirmation",
        html: `<h4> Hello, ${name}</h4>
    ${message}
    `
    });
};
exports.default = sendVerificationEmail;
//# sourceMappingURL=sendVerificationEmail.js.map