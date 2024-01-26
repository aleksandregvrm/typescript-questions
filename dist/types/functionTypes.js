"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailerConfiguration_1 = require("../utils/nodemailerConfiguration");
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport(nodemailerConfiguration_1.nodemailerConfig);
//# sourceMappingURL=functionTypes.js.map