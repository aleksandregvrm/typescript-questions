"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const handleAllErrors = (err, req, res, next) => {
    console.log(err);
    let customError = {
        statusCode: http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
        msg: 'Something went wrong, try again later',
    };
    if (err.name === 'ValidationError') {
        customError.msg = (Object.values(err.errors))
            .map((item) => item.message)
            .join(',');
    }
    if (err.code && err.code === 11000) {
        customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field, please choose another value`;
        customError.statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
    }
    if (err.name === 'CastError') {
        customError.msg = `No item found with id: ${String(err.value)}`;
        customError.statusCode = http_status_codes_1.StatusCodes.NOT_FOUND;
    }
    return res.status(customError.statusCode).json({ msg: customError.msg });
};
exports.default = handleAllErrors;
//# sourceMappingURL=errorHandler.js.map