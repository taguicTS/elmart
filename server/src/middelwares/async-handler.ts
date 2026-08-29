import { NextFunction, RequestHandler, Request, Response } from "express";


export const asyncHandler = (handler: RequestHandler) => {
	return (req: Request, res: Response, next: NextFunction) => {
		Promise.resolve(handler(req,res,next)).catch(next);
	}
}