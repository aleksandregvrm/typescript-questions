import { NextFunction } from "express";
import errorFunction from "../errors/errorFunction";
import { attachCookiesToResponse, isTokenValid } from "../utils";
import { StatusCodes } from "http-status-codes";
import  Token from "../models/TokenModel";
import { MsgType } from "../errors/errorFunction";

const authenticateUser = async (req:Request, res:Response, next:NextFunction) => {
    const { refreshToken, accessToken } = req.signedCookies;
    try {
        if (accessToken) {
            const payload = isTokenValid(accessToken);
            req.user = payload.user;
            return next();
        }
        const payload = isTokenValid(refreshToken);

        const existingToken = await Token.findOne({
            user: payload.user.userId,
            refreshToken: payload.refreshToken,
        });
        if (!existingToken || !existingToken?.isValid) {
            errorFunction(res,"Authentication Invalid",StatusCodes.UNAUTHORIZED)
        }
        const tenDays = 1000 * 60 * 60 * 24 * 10;
        const expireAt = new Date()
        attachCookiesToResponse({
            res,
            user: payload.user,
            refreshToken: existingToken.refreshToken,
        });
        req.user = payload.user;
        next();
    } catch (error) {
        errorFunction(res, "Authentication Invalid", StatusCodes.UNAUTHORIZED)
    }
};

export default authenticateUser;