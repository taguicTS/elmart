import { Router } from "express";
import { authenticate } from "@/middelwares/auth-middleware";
import { createResourceRateLimiter, publicRateLimiter, updateResourceRateLimiter } from "@/middelwares/app-rate-limit";
import { createProfileController, deleteProfileController , getProfileController, updateProfileController } from "./profile-controller";

const profileRouter = Router();

profileRouter.post("/", createResourceRateLimiter, authenticate, createProfileController);
profileRouter.get("/", publicRateLimiter, authenticate, getProfileController);
profileRouter.put("/", updateResourceRateLimiter, authenticate, updateProfileController);
profileRouter.delete("/", authenticate, deleteProfileController);

export default profileRouter;