import { Response } from "express";

export type MsgType = {
  msg:string
}
interface ErrorFunction<T> {
    (res: Response<T>, message: string, statusCode: number): Response<T>;
}
const errorFunction: ErrorFunction<MsgType> = (res, message, statusCode) => {
    return res.status(statusCode).json({ msg: message });
};

export default errorFunction;