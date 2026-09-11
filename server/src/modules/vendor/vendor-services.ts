import { ConflictError, NotFoundError, UnprocessableEntityError } from "@/errors/app-errors";
import { VendorRegister } from "./vendor-schema";
import { filter } from "@/utils/profanity-checker";
import { prisma } from "@/configs/prisma";


export const registerVendorService = async (vendorData: VendorRegister) => {
    const matchedVendor = await prisma.vendor.findUnique({ where: { userId: vendorData.userId } });
    if(matchedVendor) throw new ConflictError("User is already a registered vendor");
    if(filter.isProfane(vendorData.storeName)) throw new UnprocessableEntityError("Store name contains restricted words.");
    const [_, registeredVendor] = await prisma.$transaction([
        prisma.user.update({ where: { id: vendorData.userId }, data: { role: "VENDOR" } }),
        prisma.vendor.create({ data: vendorData, omit: { xenditAccountNumber: true, updatedAt: true } })
    ]);

    return registeredVendor;
}   

export const updateStoreNameService = async ( updatedStoreName: string, userId: string ) => {
    if(filter.isProfane(updatedStoreName)) throw new UnprocessableEntityError("Store name contains restricted words.");
    const matchedStore = await prisma.vendor.findFirst({ where: { storeName: updatedStoreName } });
    if(matchedStore) throw new ConflictError("Store name is not available to use. Please use a unique store name.");
    return await prisma.vendor.update({ 
        where: { userId },
        data: { storeName: updatedStoreName },
        omit: {
            createdAt: true,
            xenditAccountNumber: true
        }
    });
}

export const updateStoreProfileService = async (storeImage: string, userId: string) => {
     await prisma.vendor.update({
        where: { userId },
        data: { storeImage },
        omit: { 
            createdAt: true,
            xenditAccountNumber: true
        }
    });
}


export const getVendorInfoService = async (userId: string) => {
    const vendorInfo =  await prisma.vendor.findUnique({ where: { userId }, omit: { updatedAt: true } });
    if(!vendorInfo) throw new NotFoundError("Vendor info was not found");
    return vendorInfo;
}