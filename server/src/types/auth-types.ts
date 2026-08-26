import { Role } from "@/generated/prisma/enums";

interface AuthUser {
	id: string;
	email: string;
	role: Role;
}

type AccessTokenPayload = AuthUser;
type RefreshTokenPayload = Pick<AuthUser,"id">;


export type { AuthUser, AccessTokenPayload, RefreshTokenPayload };
