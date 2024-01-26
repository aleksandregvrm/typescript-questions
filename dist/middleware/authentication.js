"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Token = require("../models/TokenModel");
const utils_1 = require("../utils");
const authenticateUser = async (req, res, next) => {
    const { refreshToken, accessToken } = req.signedCookies;
    try {
        if (accessToken) {
            const payload = (0, utils_1.isTokenValid)(accessToken);
            req.user = payload.user;
            return next();
        }
        const payload = (0, utils_1.isTokenValid)(refreshToken);
        const existingToken = await Token.findOne({
            user: payload.user.userId,
            refreshToken: payload.refreshToken,
        });
        if (!existingToken || !existingToken?.isValid) {
            throw new CustomError.UnauthenticatedError("Authentication Invalid");
        }
        (0, utils_1.attachCookiesToResponse)({
            res,
            user: payload.user,
            refreshToken: existingToken.refreshToken,
        });
        req.user = payload.user;
        next();
    }
    catch (error) {
        throw new CustomError.UnauthenticatedError("Authentication Invalid");
    }
};
module.exports = authenticateUser;
//# sourceMappingURL=authentication.js.map