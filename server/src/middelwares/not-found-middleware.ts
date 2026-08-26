import { Request, Response, NextFunction } from "express";
import { NotFoundError } from "@/errors/app-errors";

export const notFoundHandler = (_req: Request, _res: Response, _next: NextFunction) => {
	throw new NotFoundError();
}