import { Request, Response, NextFunction } from "express";
import { LoginSchema, RegisterSchema, type Login, type Register } from "./auth-schema";
import { emailVerificationService, loginService, refreshTokenService, registerService } from "./auth-service";
import { BadRequestError, UnauthorizedError } from "@/errors/app-errors";
import { clearAuthCookie, setAuthCookie } from "@/utils/token";
import jwt from "jsonwebtoken";
import { env } from "@/configs/env";
import { RefreshTokenPayload } from "@/types/auth-types";


const registerController = async (req: Request<{},{},Register>, res: Response, next: NextFunction) => {
	try{
		const validated = RegisterSchema.safeParse(req.body);
	if(!validated.success) throw new BadRequestError("Data Provided is invalid");
	await registerService(validated.data);

	res.status(201).json({
		success: true,
		message: "Registered Successfully. Please verify your email",
		data: {}
	});

	}
	catch(err) {
		next(err);
	}
}

const loginController = async (req: Request<{},{},Login>, res: Response, next: NextFunction) => {
	try{

	const validated = LoginSchema.safeParse(req.body);
	if(!validated.success) throw new BadRequestError("Data Provided is invalid");

	const { accessToken, refreshToken } = await loginService(validated.data);
	setAuthCookie(accessToken, refreshToken,res);

	res.status(200).json({ 
		success: true,
		message: "Logged in Successfully",
		data: {}
	 });

	}
	catch(err){
		next(err);
	}


}

const logoutController = async (_req: Request, res: Response, next: NextFunction) => {
	try{
		clearAuthCookie(res);
		res.status(200).json({
		success: true,
		message: "Logged out Successfully",
		data: {}
	});
	}
	catch(err){
		next(err);
	}
}

const emailVerificationController = async (req: Request<{},{},{},{ token: string } >, res: Response, next: NextFunction) => {
	try{
		const updatedUser = await emailVerificationService(req.query.token);
		res.status(200).json({
			success: true,
			message: "Email Verified. Please proceed to login",
			data: updatedUser
		});
	}
	catch(err){
		next(err);
	}
}

const refreshTokenController = async (req: Request, res: Response, next: NextFunction) => {
	try{
		const refreshToken = req.cookies["refresh_token"] as string;
		if(!refreshToken) throw new UnauthorizedError("Refresh token is missing");
		const refreshPayload = jwt.verify(refreshToken,env.JWT_REFRESH_KEY) as RefreshTokenPayload;
		const { newAccessToken, newRefreshToken } = await refreshTokenService(refreshPayload.id);
		clearAuthCookie(res);
		setAuthCookie(newAccessToken,newRefreshToken,res);
		res.status(200).json({
		success: true,
		message: "Access and Refresh Token updated",
		data: {}
		});	
	}
	catch(err){
		next(err);
	}
}


export { registerController, loginController, logoutController, emailVerificationController, refreshTokenController };