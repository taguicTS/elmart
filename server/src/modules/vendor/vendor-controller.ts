import { BadRequestError } from "@/errors/app-errors";
import { asyncHandler } from "@/middelwares/async-handler";
import { Request, Response } from "express";
import z from "zod";
import { RegisterVendorSchema, UpdateStoreNameSchema, VendorRegister } from "./vendor-schema";
import { getVendorInfoService, registerVendorService, updateStoreNameService, updateStoreProfileService } from "./vendor-services";
import { getSignedUser } from "@/utils/get-current-user";


export const registerVendorController = asyncHandler(async (req: Request<{},{},z.infer<typeof RegisterVendorSchema> >, res: Response ) => {
    const { id } = getSignedUser(req);
    if(!req.file) throw new BadRequestError("Please upload an image for the Store profile picture");
    const result = RegisterVendorSchema.safeParse(req.body);
    if(!result.success) throw new BadRequestError("Data provided is invalid");
    const fileName = req.file.filename;

    const processableVendorData: VendorRegister = {
        ...result.data,
        storeImage: fileName,
        userId: id
    }
    const registeredVendor = await registerVendorService(processableVendorData);

    res.status(201).json({
        success: true,
        message: "Vendor Registration succeeded.",
        data: {
            vendorInfo: registeredVendor
        }
    })
});

export const updateStoreNameController = asyncHandler(async (req: Request<{},{},{ storeName: string }>, res: Response) => {
    const { id } = getSignedUser(req);
    const result = UpdateStoreNameSchema.safeParse(req.body);
    if(!result.success) throw new BadRequestError("Data provided is invalid");
    const updatedVendorInfo = await updateStoreNameService(result.data.storeName,id);
    res.status(200).json({
        success: true,
        message: "Store name is updated",
        data: {
            updatedVendorInfo
        }
    });
});


export const updateStoreProfileController = asyncHandler(async (req: Request, res: Response) => {
    const { id } = getSignedUser(req);
    if(!req.file) throw new BadRequestError("Please upload an image for your update");
    await updateStoreProfileService(req.file.filename,id);
    res.status(200).json({
        success: true,
        message: "Store profile is updated",
        data: null
    }); 
});

export const getVendorInfoController = asyncHandler(async (req: Request, res: Response) => {
    const { id } = getSignedUser(req);
    const vendor = await getVendorInfoService(id);
    res.status(200).json({ 
        success: true,
        message: "Vendor info fetched",
        data: vendor
    });
});