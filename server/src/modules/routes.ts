import { Router } from "express";
import authRouter from "./auth/auth-routes";


const mainRouter = Router();

mainRouter.use("/auth", authRouter);


export default mainRouter;