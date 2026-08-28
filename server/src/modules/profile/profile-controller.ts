import { Request, Response, NextFunction } from "express";
import { ProfileSchema, type Profile, Params, ParamSchema } from "./profile-schema";
import { BadRequestError } from "@/errors/app-errors";
import { getSignedUser } from "@/utils/get-current-user";
import { createProfileService, deleteProfileService, getProfileService, updateProfileService } from "./profile-service";

const createProfileController = async (req: Request<{},{},Omit<Profile,"userId"> >, res: Response, next: NextFunction) => {
	try{
	const signedUser = getSignedUser(req);
	const validated = ProfileSchema.safeParse(req.body);
	if(!validated.success) throw new BadRequestError("Data Provided is invalid");
	const profileData: Profile = {
		...validated.data,
		userId: signedUser.id
	};

	const profile = await createProfileService(profileData);
	res.status(201).json({ 
		success: true,
		message: "User Profile created",
		data: profile
	});
	}
	catch(err){
		next(err);
	}

}

const getProfileController = async (req: Request, res: Response, next: NextFunction) => {
	try{
	const signedUser = getSignedUser(req);
	const userProfile = await getProfileService(signedUser.id);
	res.status(200).json({
		success: true,
		message: "User Profile Fetched",
		data: userProfile
	});	
	}
	catch(err){
		next(err);
	}
}


const updateProfileController = async (req: Request<{},{},Partial<Omit<Profile,"avatar" | "userId">> >, res: Response, next: NextFunction) => {
	try{
	const signedUser = getSignedUser(req);
	const updatedProfile = await updateProfileService(req.body,signedUser.id);
	res.status(200).json({
		success: true,
		message: "User Profile has been updated",
		timestamp: updatedProfile.updatedAt,
		data: updatedProfile
	});
	}
	catch(err){
		next(err);
	}
}

const deleteProfileController = async (req: Request<Params>, res: Response, next: NextFunction) => {
	const signedUser = getSignedUser(req);
	const validated = ParamSchema.safeParse({ id: signedUser.id });
	if(!validated.success) throw new BadRequestError("Id Provided is not a valid UUID Format");
	await deleteProfileService(validated.data.id);
	res.sendStatus(204);
}


export { createProfileController, getProfileController, updateProfileController, deleteProfileController };