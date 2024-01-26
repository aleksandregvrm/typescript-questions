import User from '../models/UserModel';
import Token from "../models/TokenModel";
import { Request,Response } from "express";
import { StatusCodes } from "http-status-codes";
import errorFunction from "../errors/errorFunction";
import {createTokenUser,attachCookiesToResponse} from '../utils';
import sendVerificationEmail from '../utils/sendVerificationEmail';
import crypto from "crypto";

// Register User
const registerUser = async (req:Request,res:Response) : Promise<void> => {
   const { email, password, name } = req.body;
   
   let role:string = "user";
   if (!email || !password || !name) {
       errorFunction(res,"Please Provide Email,Password and Name",StatusCodes.BAD_REQUEST)
   }
   const firstTwoAccounts = (await User.countDocuments({})) < 2;
   if (firstTwoAccounts) {
      role = "admin"
   }
   const verificationToken:string = crypto.randomBytes(40).toString("hex");
   const user = await User.create({
      name,
      email,
      password,
      role,
      verificationToken,
   });
   const origin:string = "http://localhost:5002/api/v1/auth";
   await sendVerificationEmail({
      name: user.name,
      email: user.email,
      verificationToken: user.verificationToken,
      origin,
   });
   res.status(StatusCodes.CREATED).json({ user: { name, email } });
}
// Verify User
const verifyUser = async (req:Request,res:Response) => {
   const { token:verificationToken, email } = req.query;
   const user = await User.findOne({ email });

   if (!user) {
       errorFunction(res,"Verification Failed",StatusCodes.UNAUTHORIZED)
   }
   if (user.verificationToken !== verificationToken) {
       errorFunction(res, "Verification Failed", StatusCodes.UNAUTHORIZED)
   }
   
   user.isVerified = true;
   user.verifiedDate = new Date();
   user.verificationToken = "";

   await user.save();
   console.log('verification is a success');
   
   res.status(StatusCodes.OK).json({ msg: "Email Verified" });
}
// Login User ->
const loginUser = async (req:Request,res:Response) : Promise<void> => {
   const { email, password } = req.body;
   if (!email || !password) {
      errorFunction(res, "Please provide password and email", StatusCodes.BAD_REQUEST);
   }
   const user = await User.findOne({ email });
   if (!user) {
      errorFunction(res, "Invalid credentials", StatusCodes.UNAUTHORIZED);
   }
   const passwordCheck = await user.comparePassword(password);
   if (!passwordCheck) {
      errorFunction(res, "Invalid credentials", StatusCodes.UNAUTHORIZED);
   }
   if (!user.isVerified) {
      errorFunction(res,"The account is not verified", StatusCodes.UNAUTHORIZED)
   }
   const tokenUser = createTokenUser(user);

   let refreshToken = "";
   const existingToken = await Token.findOne({ user: user._id });
   const thirtyDays = 1000 * 60 * 60 * 24 * 30;
   const expirationTime = new Date(Date.now() + thirtyDays);
   if (existingToken) {
      const { isValid } = existingToken;
      if (!isValid) {
         errorFunction(res, "Invalid credentials", StatusCodes.UNAUTHORIZED)
      }
      refreshToken = existingToken.refreshToken;
      attachCookiesToResponse({ res, user: tokenUser, refreshToken, expiresAt: expirationTime });
      res.status(StatusCodes.OK).json({ user: tokenUser });
      return;
   }
   refreshToken = crypto.randomBytes(40).toString("hex");
   const userAgent = req.headers["user-agent"];
   const ip = req.ip;
   const userToken = { refreshToken, ip, userAgent, user: user._id, expires: expirationTime };

   const token = await Token.create(userToken);
   
   attachCookiesToResponse({ res, user: tokenUser, refreshToken, expiresAt: expirationTime });

   res.status(StatusCodes.OK).json({ user: tokenUser });
}
const logoutUser = async (req: Request, res: Response) => {
   errorFunction(res, "You haven't provided values", StatusCodes.BAD_REQUEST,)
}

export {registerUser,verifyUser,loginUser,logoutUser}