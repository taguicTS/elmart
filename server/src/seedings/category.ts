import { prisma } from "@/configs/prisma";
import { Category } from "@/generated/prisma/client";


const category: Array<Omit<Category,"id">> = [
	{ name: "Clothing" },
	{ name: "Electronics" },
	{ name: "Books" },
	{ name: "Cosmetics" },
	{ name: "Gaming" },
	{ name: "Furniture" },
	{ name: "Footwear" },
	{ name: "Crafts" },
	{ name: "Watches" },
	{ name: "Appliances" },
	{ name: "Jewelry" },
	{ name: "Tools" }
];

const main = async (category:Array<Omit<Category,"id">> ) => {
	category.forEach(async c => {
		await prisma.category.create({
			data: c
		})
	});
}

main(category);