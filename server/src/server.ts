import "dotenv/config";
import "src/configs/env";
import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors"; 
import { env } from "src/configs/env";
import { notFoundHandler } from "./middelwares/not-found-middleware";
import { errorHandler } from "./middelwares/error-middleware";
import mainRouter from "./modules/routes";
import { upload } from "./configs/multer";

const PORT = env.PORT;

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" }}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.get("/health", (_req: Request, res: Response, _next: NextFunction) => res.json({ message: "Server is healthy" }));
app.post("/test-upload",upload.single("image"), (_: Request, res: Response) => res.status(200).json({ file: _.file }));

app.use("/api/v1", mainRouter);

app.use(notFoundHandler);
app.use(errorHandler);

  
app.listen(PORT,() => console.info(`Express Server started on http://localhost:${PORT}`));
