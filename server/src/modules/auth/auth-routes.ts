import { Router } from "express";
import { emailVerificationController, loginController, logoutController, refreshTokenController, registerController } from "./auth-controller";



const authRouter = Router();

authRouter.post("/register", registerController);
authRouter.post("/login",loginController);
authRouter.post("/logout", logoutController);
authRouter.get("/verify-email", emailVerificationController);
authRouter.post("/refresh-token", refreshTokenController);

export default authRouter;