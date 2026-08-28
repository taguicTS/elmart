import { UnauthorizedError } from "@/errors/app-errors";
import { Request } from "express";


export const getSignedUser = (req: Request) => {
	const user = req.user;
	if(!user) throw new UnauthorizedError("User not authenticated");
	return user;
}