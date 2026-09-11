import z from "zod";
import { ProductStatus } from "@/generated/prisma/enums";


export const CreateProductSchema = z.object({
  name: z.string(),
  price: z.coerce.number(),
  stock: z.coerce.number(),
  status: z.enum(ProductStatus).optional(),
  categoryId: z.string()
});

export type ProductRequestBody = z.infer<typeof CreateProductSchema>;
export type ProductInsert = ProductRequestBody & { categoryId: string, images: string[] };


// model Product {
//   id         String        @id @default(uuid()) @db.Uuid
//   vendorId   String        @map("vendor_id") @db.Uuid
//   categoryId String        @map("category_id") @db.Uuid
//   name       String
//   price      Decimal       @db.Decimal(12, 2)
//   stock      Int           @default(0)
//   status     ProductStatus @default(DRAFT)
//   vendor     Vendor      @relation(fields: [vendorId], references: [id], onDelete: Cascade)
//   category   Category    @relation(fields: [categoryId], references: [id])
//   cartItems  CartItem[]
//   orderItems OrderItem[]

//   createdAt  DateTime      @default(now()) @map("created_at")
//   updatedAt  DateTime      @updatedAt @map("updated_at")
//   @@map("products")
// }