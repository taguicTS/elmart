import { prisma } from "@/configs/prisma";
import { Decimal } from "@prisma/client/runtime/client";
import { ProductInsert } from "./product-schema";
import { filter } from "@/utils/profanity-checker";
import { UnprocessableEntityError } from "@/errors/app-errors";

export const createProductService = async (productData: ProductInsert, userId: string) => {
	const vendorState = await prisma.vendor.findUnique({ where: { userId } });
	if(!vendorState) throw new UnprocessableEntityError("Cannot create product. User is not a registered vendor.");
	if(filter.isProfane(productData.name)) throw new UnprocessableEntityError("Product name contains restricted words");
	const createdProduct = await prisma.product.create({
		data: {
			...productData,
			price: Decimal(productData.price),
			vendorId: vendorState.id
		} ,
		select: {
			id: true,
			name: true,
			createdAt: true
		}
	});

	return createdProduct;
}