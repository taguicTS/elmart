import jwt from "jsonwebtoken";
import { env } from "@/configs/env";
import { Response } from "express";
import { AccessTokenPayload, RefreshTokenPayload } from "@/types/auth-types";


const ACCESS_TOKEN_MAX_AGE = 15 * 60 * 1000; // 15 minutes
const REFRESH_TOKEN_MAX_AGE = 7 * 24 * 60 * 60 * 1000; // 7 days


export const generateAccessToken = (payload: AccessTokenPayload): string => {
	return jwt.sign(payload,env.JWT_ACCESS_KEY, { expiresIn: "15m", subject: "Access Token" });
}

export const generateRefreshToken = (payload: RefreshTokenPayload): string => {
	return jwt.sign(payload, env.JWT_REFRESH_KEY, { expiresIn: "7d", subject: "Refresh Token" });
}

export const setAuthCookie = (accessToken: string, refreshToken: string, res: Response): void => {
	res.cookie("access_token", accessToken, { 
		httpOnly: true,
		secure: env.NODE_ENV === "production",
		path: "/",
		sameSite: "lax",
		maxAge: ACCESS_TOKEN_MAX_AGE
	});

	res.cookie("refresh_token", refreshToken, {
		httpOnly: true,
		secure: env.NODE_ENV === "production",
		path: "/api/v1/auth/refresh-token",
		sameSite: "lax",
		maxAge: REFRESH_TOKEN_MAX_AGE
	});
}

export const clearAuthCookie = (res: Response) => {
	res.clearCookie("access_token",{ path: "/" });
	res.clearCookie("refresh_token", { path: "/api/v1/auth/refresh-token" });
}