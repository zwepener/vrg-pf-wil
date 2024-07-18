import { z } from "zod";

export const RawUserSchema = z.object({
  id: z.string().uuid(),
  username: z.string(),
  password: z.string(),
  firstname: z.string(),
  lastname: z.string(),
  email: z.string().email().nullable(),
  display_name: z.string(),
  role: z.union([z.literal("admin"), z.literal("agent"), z.literal("user")]),
  created_at: z.coerce.date({
    invalid_type_error: "User Created At value is not a valid date.",
    message: "Not a valid date.",
  }),
  updated_at: z.coerce.date({
    invalid_type_error: "User Updated At value is not a valid date.",
    message: "Not a valid date.",
  }),
});
export type RawUser = z.infer<typeof RawUserSchema>;

export const UserSchema = RawUserSchema.omit({ password: true });
export type User = z.infer<typeof UserSchema>;

export const NewUserSchema = RawUserSchema.omit({
  id: true,
  role: true,
  created_at: true,
  updated_at: true,
});
export type NewUser = z.infer<typeof NewUserSchema>;

const EditableUserPropertiesSchema = RawUserSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});
export type EditableUserProperties = z.infer<
  typeof EditableUserPropertiesSchema
>;

export const PropertySchema = z.object({
  id: z.string().min(1, "Property ID is empty.").uuid(),
  agent_id: z.string().uuid(),
  title: z.string().min(1, "Property Title is empty."),
  description: z.string().min(1, "Property Description is empty."),
  price: z.number(),
  bedrooms: z.number(),
  bathrooms: z.number(),
  country: z.string(),
  state: z.string(),
  zip_code: z.string(),
  city: z.string(),
  street_address: z.string(),
  featured: z.boolean(),
  delisted: z.boolean(),
  enlisted_at: z.coerce.date({
    invalid_type_error: "Property Enlisted At value is not a valid date.",
    message: "Not a valid date.",
  }),
  updated_at: z.coerce.date({
    invalid_type_error: "Property Updated At value is not a valid date.",
    message: "Not a valid date.",
  }),
});
export type Property = z.infer<typeof PropertySchema>;

const EditablePropertyPropertiesSchema = PropertySchema.omit({
  id: true,
  enlisted_at: true,
  updated_at: true,
});
export type EditablePropertyProperties = z.infer<
  typeof EditablePropertyPropertiesSchema
>;

declare module "next-auth" {
  interface Session {
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: User;
  }
}
