import z from "zod";


const ProfileSchema = z.object({
  name: z.string(),
  phone: z.string().optional(),
  avatar: z.string().optional(),
  address: z.string().optional()
});

const ParamSchema = z.object({
  id: z.uuid()
})

type Params = z.infer<typeof ParamSchema>;



type Profile = z.infer<typeof ProfileSchema> & { userId: string };

export { ProfileSchema, type Profile , ParamSchema, type Params};