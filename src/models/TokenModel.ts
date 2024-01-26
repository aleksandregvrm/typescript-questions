import mongoose, { Schema,Types } from "mongoose";
import { TokenSchemaInter } from "../types/modelTypes";

const TokenSchema = new Schema(
    {
        refreshToken: { type: String, required: true },
        ip: { type: String, required: true },
        userAgent: { type: String, required: true },
        isValid: { type: Boolean, default: true },
        expires: { type: String },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model<TokenSchemaInter>("Token", TokenSchema);