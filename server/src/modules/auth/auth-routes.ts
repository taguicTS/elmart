import { Router } from "express";
import { emailVerificationController, loginController, logoutController, refreshTokenController, registerController } from "./auth-controller";
import { authRateLimiter } from "@/middelwares/app-rate-limit";
import { authenticate } from "@/middelwares/auth-middleware";

const authRouter = Router();

authRouter.use(authRateLimiter);
authRouter.post("/register", registerController);
authRouter.post("/login",loginController);
authRouter.post("/logout", logoutController);
authRouter.get("/verify-email", emailVerificationController);
authRouter.post("/refresh-token",authenticate, refreshTokenController);

export default authRouter;