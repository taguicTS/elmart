import z from "zod";

export const RegisterVendorSchema = z.object({
  storeName: z.string(),
  xenditAccountNumber: z.string(),
});

export const UpdateStoreNameSchema = z.object({
  storeName: z.string()
});




export type VendorRegister = z.infer<typeof RegisterVendorSchema> & { userId: string; storeImage: string; };
