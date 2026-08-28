import { prisma } from "@/configs/prisma";
import { ProfileSchema, type Profile } from "./profile-schema";
import { filter } from "@/utils/profanity-checker";
import { NotFoundError, UnprocessableEntityError } from "@/errors/app-errors";
import z from "zod";


const createProfileService = async (profileData: Profile) => {
	if(filter.isProfane(profileData.name) || filter.isProfane(profileData.name)) {
		throw new UnprocessableEntityError("Name or Address contains restricted words");
	}
	return await prisma.profile.create({
		data: profileData
	});
}

const getProfileService = async (userId: string) => {
	const userProfile = await prisma.profile.findUnique({
		where: { userId }
	});
	if(!userProfile) throw new NotFoundError("User profile not found");
	return userProfile;
}

const updateProfileService = async (profileData: Partial<Omit<z.infer<typeof ProfileSchema>,"avatar">>, userId: string) => {
	return await prisma.profile.update({
		where: { userId },
		data: profileData
	});
}

const deleteProfileService = async (userId: string) => {
	return await prisma.profile.delete({
		where: { userId }
	});
}



export { createProfileService, getProfileService, updateProfileService, deleteProfileService };