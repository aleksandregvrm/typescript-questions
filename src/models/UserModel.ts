import mongoose, { Document,Schema } from 'mongoose';
import validator from "validator";
import bcrypt from "bcryptjs";
import { UserSchemaInter } from '../types/modelTypes';

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please provide name"],
        minlength: 3,
        maxlength: 50,
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Please provide email"],
        validate: {
            validator: validator.isEmail,
            message: "Please provide valid email",
        },
    },
    password: {
        type: String,
        required: [true, "Please provide password"],
        minlength: 6,
    },
    role: {
        type: String,
        required: true,
        enum: ["admin", "user"],
        default: "user",
    },
    verificationToken: {
        type: String,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    verifiedDate: {
        type: Date,
    },
});

UserSchema.pre("save", async function (this: UserSchemaInter & Document, next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.methods.comparePassword = async function (this: UserSchemaInter, candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
};

const UserModel = mongoose.model<UserSchemaInter>('User', UserSchema);

export default UserModel;