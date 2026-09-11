import { createResourceRateLimiter, publicRateLimiter, updateResourceRateLimiter } from "@/middelwares/app-rate-limit";
import { authenticate, authorize } from "@/middelwares/auth-middleware";
import { Router } from "express";
import { getVendorInfoController, registerVendorController, updateStoreNameController, updateStoreProfileController } from "./vendor-controller";
import { upload } from "@/configs/multer";

const vendorRouter = Router();

vendorRouter.post("/", createResourceRateLimiter, authenticate,upload.single("image"), registerVendorController);
vendorRouter.put("/store",updateResourceRateLimiter,authenticate, authorize("VENDOR"), updateStoreNameController );
vendorRouter.put("/store-profile",updateResourceRateLimiter, authenticate, authorize("VENDOR"),upload.single("image"), updateStoreProfileController);
vendorRouter.get("/",publicRateLimiter, authenticate, authorize("VENDOR"), getVendorInfoController);

export default vendorRouter;