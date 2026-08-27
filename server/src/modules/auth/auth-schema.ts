import z from "zod";


export const RegisterSchema = z.object({ 
	email: z.email("Please enter a valid email address"),
	password: z.string().min(8).max(15)
});


export const LoginSchema = z.object({
	email: z.email("Please enter a valid email address"),
	password: z.string().min(8).max(15)
});


export type Register = z.infer<typeof RegisterSchema>;
export type Login = z.infer<typeof LoginSchema>;


