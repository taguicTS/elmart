import { unlink } from "node:fs/promises";
import path from "node:path";

const uploadDir = path.join(process.cwd(),"uploads");


export const deleteAvatar = async (filename: string) => {
	const filePath = path.join(uploadDir,filename);
	try{
		await unlink(filePath);
	}
	catch(err: any){
		if(err.code !== "ENOENT") {
			throw err;
		}
	}
}