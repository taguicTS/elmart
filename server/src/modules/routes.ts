import { Router } from "express";
import authRouter from "./auth/auth-routes";
import profileRouter from "./profile/profile-routes";
import productRouter from "./product/product-routes";
import vendorRouter from "./vendor/vendor-routes";


const mainRouter = Router();

mainRouter.use("/auth", authRouter);
mainRouter.use("/profile", profileRouter);
mainRouter.use("/products",productRouter);
mainRouter.use("/vendor",vendorRouter);


export default mainRouter;