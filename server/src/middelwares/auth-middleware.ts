import { Request, Response, NextFunction } from "express";
import { ForbiddenError, UnauthorizedError } from "@/errors/app-errors";
import { AccessTokenPayload } from "@/types/auth-types";
import jwt from "jsonwebtoken";
import { env } from "@/configs/env";

const authenticate = (req: Request, _res: Response, next: NextFunction) => {
	const accessToken = req.cookies["access_token"] as string;
	if(!accessToken) throw new UnauthorizedError("User not authenticated");

	let payload: AccessTokenPayload;
	try{
	payload = jwt.verify(accessToken,env.JWT_ACCESS_KEY) as AccessTokenPayload;
	req.user = payload;
	next();
	}

	catch(err){
		return next(err);
	}

}

const authorize = (...roles: string[]) => {
	return (req: Request, _res: Response, next: NextFunction) => {
		if(!roles.includes(req.user?.role!)){
			throw new ForbiddenError("Route is Forbidden");
		}
		next();
	}
}

export { authenticate, authorize };