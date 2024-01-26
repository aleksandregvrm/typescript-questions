import { nodemailerConfig } from "../utils/nodemailerConfiguration";
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport(nodemailerConfig);

// Emails start
export type NodeMailerType = {
    service: string,
    auth: {
        user: string,
        pass: string
    }
}
type SendEmailParamsType = {
    to: string, subject: string, html: string
}
export interface SendEmailInter {
    (params:SendEmailParamsType): Promise<typeof transporter.sendEmail>
}
type SendVerificationParametersType<T> = {
    name: T,
    email: T,
    verificationToken: T,
    origin: T
}
export interface SendVerificationEmailInter<T> {
    (params: SendVerificationParametersType<T>): ReturnType<SendEmailInter>
}
// Emails end

// Tokens start
export type TokenUserType = {
  name:string,
  _id:unknown,
  email?:string,
  password?:string,
  role:string,
  verificationToken?:string | null,
  isVerified?:boolean,
  verifiedDate?:Date
}
export interface CreateTokenUserInter  {
    (user:TokenUserType) : TokenUserType
}
// Tokens end

