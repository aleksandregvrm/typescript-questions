import nodemailer from "nodemailer";
import {nodemailerConfig} from "./nodemailerConfiguration";
import { SendEmailInter } from "../types/functionTypes";

const sendEmail:SendEmailInter = async ({to,subject, html}) => {
    let testAccount = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport(nodemailerConfig);
     return transporter.sendMail({
         from: '"Georgian Quiz App" <aleksandregvg@outlook.com>',
         to,
         subject,
         html,
     });
};

export default sendEmail;