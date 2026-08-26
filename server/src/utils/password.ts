import bcrypt from "bcrypt";


const hashPassword = async (plainPassword: string): Promise<string> => {
	const SALT_ROUNDS = 10;
	return await bcrypt.hash(plainPassword,SALT_ROUNDS);
}

const comparePassword = async (plainPassword: string, hashedPassword: string): Promise<boolean> => {
	return await bcrypt.compare(plainPassword, hashedPassword);
}

export { hashPassword, comparePassword };