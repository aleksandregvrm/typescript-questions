"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorFunction = (res, message, statusCode) => {
    return res.status(statusCode).json({ msg: message });
};
exports.default = errorFunction;
//# sourceMappingURL=errorFunction.js.map