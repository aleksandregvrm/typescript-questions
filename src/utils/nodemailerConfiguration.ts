import { NodeMailerType } from "../types/functionTypes";
export const nodemailerConfig:NodeMailerType = {
    service: "hotmail",
    auth: {
        user: "aleksandregvg@outlook.com",
        pass: process.env.NODE_PASSWORD,
    },
};

