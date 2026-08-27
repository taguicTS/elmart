import { prisma } from "@/configs/prisma";
import { Login, Register } from "./auth-schema";
import { sendMail } from "@/configs/nodemailer";
import { ConflictError, UnauthorizedError, UnprocessableEntityError } from "@/errors/app-errors";
import { comparePassword, hashPassword } from "@/utils/password";
import crypto from "crypto";
import { AuthUser } from "@/types/auth-types";
import { generateAccessToken, generateRefreshToken } from "@/utils/token";

const registerService = async (userData: Register) => {
	const existingUser = await prisma.user.findUnique({ where: { email: userData.email } });
	if(existingUser) throw new ConflictError("Email is not available");

	const newUser: Register = {
		...userData,
		password: await hashPassword(userData.password)
	};


	const { user, verification } = await prisma.$transaction( async ctx => {
		const createdUser = await ctx.user.create({
			data: newUser,
			omit: {
				password: true
			}
		});
		const verificationToken = crypto.randomBytes(64).toString("hex");
		const expiresAt = new Date(Date.now() + 60 * 60 * 1000); 
		const createdVerification = await ctx.verificationToken.create({
			data: {
				token: verificationToken,
				expiresAt,
				userId: createdUser.id
			}
		});

		return { user: createdUser, verification: createdVerification };

	});

	void sendMail(user.email,verification.token);
}

const loginService = async (userData: Login) => {
	const matchedUser = await prisma.user.findUnique({
		where: { email: userData.email }
	});
	if(!matchedUser) throw new UnauthorizedError("Email or password is invalid");
	const isMatchedPassword = await comparePassword(userData.password, matchedUser.password);
	if(!isMatchedPassword) throw new UnauthorizedError("Email or password is invalid");
	if(!matchedUser.isVerified) throw new UnauthorizedError("Please verify your account before loggin in.");

	const { id, email, role } = matchedUser;

	const payload: AuthUser = { id, email, role };

	const accessToken = generateAccessToken(payload);
	const refreshToken = generateRefreshToken({ id });

	return { accessToken, refreshToken };

}


const emailVerificationService = async (token: string) => {
	const verification = await prisma.verificationToken.findUnique({ 
		where: { token }
	});
	if(!verification) throw new UnprocessableEntityError("Verification token was not found");
	if(verification.expiresAt! < new Date()) throw new UnprocessableEntityError("Verification token has expired");

	const updatedUser = await prisma.user.update({
		where: { id: verification.userId },
		data: { isVerified: true },
		omit: {
			password: true,
			createdAt: true,
			updatedAt: true
		}
	});

	return updatedUser;
}


const refreshTokenService = async (userId: string) => {
	const user = await prisma.user.findUnique({ where: { id: userId } });
	if(!user) throw new UnauthorizedError("User not found");
	const { id, email, role } = user;
	const payload: AuthUser = { id, email, role };

	const newAccessToken = generateAccessToken(payload);
	const newRefreshToken = generateRefreshToken({ id });

	return { newAccessToken, newRefreshToken };
}



export { registerService, loginService, emailVerificationService, refreshTokenService };