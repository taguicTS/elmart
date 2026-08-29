import { Router } from "express";
import { authenticate } from "@/middelwares/auth-middleware";
import { createResourceRateLimiter, publicRateLimiter, updateResourceRateLimiter } from "@/middelwares/app-rate-limit";
import { createProfileController, deleteAvatarController, deleteProfileController , getProfileController, updateProfileController, uploadAvatarController } from "./profile-controller";
import { upload } from "@/configs/multer";

const profileRouter = Router();

profileRouter.post("/", createResourceRateLimiter, authenticate, createProfileController);
profileRouter.get("/", publicRateLimiter, authenticate, getProfileController);
profileRouter.put("/", updateResourceRateLimiter, authenticate, updateProfileController);
profileRouter.delete("/", authenticate, deleteProfileController);
profileRouter.post("/avatar",updateResourceRateLimiter, authenticate,upload.single("image"), uploadAvatarController);
profileRouter.delete("/avatar", updateResourceRateLimiter, authenticate, deleteAvatarController);


export default profileRouter;