import { createResourceRateLimiter } from "@/middelwares/app-rate-limit";
import { authenticate } from "@/middelwares/auth-middleware";
import { Router } from "express";
import { createProductController } from "./product-controller";
import { upload } from "@/configs/multer";


const productRouter = Router();

productRouter.post("/", createResourceRateLimiter, authenticate,upload.array("images"), createProductController);

export default productRouter;