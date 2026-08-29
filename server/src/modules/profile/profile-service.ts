import { prisma } from "@/configs/prisma";
import { ProfileSchema, type Profile } from "./profile-schema";
import { filter } from "@/utils/profanity-checker";
import { ConflictError, NotFoundError, UnprocessableEntityError } from "@/errors/app-errors";
import z from "zod";
import { deleteAvatar } from "@/utils/delete-avatar";


const phoneNumberFormat = /^(09|\+639)\d{9}$/;

const createProfileService = async (profileData: Profile, userId: string) => {

	const matchedProfile = await prisma.profile.findUnique({ where: { userId } });
	if(matchedProfile) throw new ConflictError("Profile already exists.");

	if(filter.isProfane(profileData.name) || (profileData.address && filter.isProfane(profileData.address))) {
		throw new UnprocessableEntityError("Name or Address contains restricted words");
	}
	if(profileData.phone && !phoneNumberFormat.test(profileData.phone)) throw new UnprocessableEntityError("Phone number is invalid");
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
	if((profileData.name && filter.isProfane(profileData.name)) || (profileData.address && filter.isProfane(profileData.address))) {
		throw new UnprocessableEntityError("Name or Address contains restricted words");
	}
	if(profileData.phone && !phoneNumberFormat.test(profileData.phone)) throw new UnprocessableEntityError("Phone number is invalid");

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

const uploadAvatarService = async (avatar: string, userId: string) => {
	await prisma.profile.update({
		where: { userId },
		data: { avatar }
	})
}

const deleteAvatarService = async (userId: string) => {
	const profile = await prisma.profile.findUnique({ where: { userId } });
	if(!profile) throw new UnprocessableEntityError("User currently have no profile created");
	if(!profile.avatar) throw new UnprocessableEntityError("User haven't uploaded an avatar");
	await prisma.profile.update({ where: { userId }, data: { avatar: null } });
	await deleteAvatar(profile.avatar);
}



export { createProfileService, getProfileService, updateProfileService, deleteProfileService, uploadAvatarService, deleteAvatarService };