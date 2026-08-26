import z from "zod";


const EnvSchema = z.object({
	PORT: z.string(),
	JWT_ACCESS_KEY: z.string(),
	JWT_REFRESH_KEY: z.string(),
	DATABASE_URL: z.string(),
	NODE_ENV: z.string().default("development")
});
 
const result = EnvSchema.safeParse(process.env);
if(!result.success) {
	throw new Error("Missing Required Environment Variables. Please check your env file");
}

export const env = result.data;

export type Env = z.infer<typeof EnvSchema>;

