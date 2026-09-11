import { asyncHandler } from "@/middelwares/async-handler";
import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "@/errors/app-errors";
import { CreateProductSchema, ProductInsert, ProductRequestBody } from "./product-schema";
import { getSignedUser } from "@/utils/get-current-user";
import { createProductService } from "./product-service";

 export const createProductController = asyncHandler(async (req: Request<{},{},ProductRequestBody>, res: Response, next: NextFunction) => {
 	try{
 		const signedUser = getSignedUser(req);
 	if(req.files?.length === 0) throw new BadRequestError("Please upload a single or multiple image for product references.");
 	const productImages = (req.files as Express.Multer.File[]).map(img => img.filename);
 	const validated = CreateProductSchema.safeParse(req.body);
 	if(!validated.success) throw new BadRequestError(validated.error.message);

 	const newProduct: ProductInsert = {
 		...validated.data,
 		images: productImages,
 	}

 	const createdProduct = await createProductService(newProduct,signedUser.id);

 	res.status(200).json({
 		success: true,
 		message: "Product successfully added to your store",
 		data: {
 			productDetails: createdProduct
 		}
 	})

 	}
 	catch(err){
 	 next(err);
 	}


 });	