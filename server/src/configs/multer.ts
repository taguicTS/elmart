import multer from "multer";
import path from "node:path";
import { Request } from "express";
import { BadRequestError } from "@/errors/app-errors";


const storage = multer.diskStorage({
	destination: (_req: Request, _file: Express.Multer.File, cb: (error: Error | null, destination: string) => void,) => {
		cb(null,"uploads/");
	},
	filename: (_req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void,) => {
		const ext = path.extname(file.originalname);

    	const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;

    	cb(null, filename);
	}
});

export const upload = multer({
	storage,
	limits: {
		fileSize: 5 * 1024 * 1024
	},
	fileFilter: (_req: Request, file: Express.Multer.File, cb: (error: Error | null, destination?: any) => void,) => {
		const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
    ];

    	if(!allowedTypes.includes(file.mimetype)) {
    		cb(new BadRequestError("File Type is not allowed"));
    	}

    	cb(null,true);

	}
});