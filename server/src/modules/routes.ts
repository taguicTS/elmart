import { Router } from "express";
import authRouter from "./auth/auth-routes";
import profileRouter from "./profile/profile-routes";


const mainRouter = Router();

mainRouter.use("/auth", authRouter);
mainRouter.use("/profile", profileRouter);


export default mainRouter;