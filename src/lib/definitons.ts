import { z } from "zod";

export const RawUserSchema = z.object({
  id: z.string(),
  username: z.string(),
  password: z.string(),
  firstname: z.string(),
  lastname: z.string(),
  email: z.string().email().nullable(),
  avatar_url: z.string().url().nullable(),
  favorites: z.array(z.string().uuid()).nullable(),
  wishlist: z.array(z.string().uuid()).nullable(),
  role: z.union([z.literal("admin"), z.literal("agent"), z.literal("user")]),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});
export type RawUser = z.infer<typeof RawUserSchema>;

export const UserSchema = RawUserSchema.omit({ password: true });
export type User = z.infer<typeof UserSchema>;

export const NewUserSchema = RawUserSchema.pick({
  username: true,
  password: true,
  firstname: true,
  lastname: true,
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

export const RawPropertySchema = z.object({
  id: z.string(),
  agent_id: z.string(),
  title: z.string().min(1, "Property Title is empty."),
  description: z.string().min(1, "Property Description is empty."),
  listing_type: z.union([z.literal("rent"), z.literal("sell")]),
  price: z.number().min(0, "Property's price cannot be less than 0."),
  bedrooms: z.number().min(1, "Property cannot have less than 1 bedrooms."),
  bathrooms: z.number().min(1, "Property cannot have less than 1 bathrooms."),
  address: z.string(),
  images: z.array(z.string().url()),
  featured: z.boolean(),
  delisted: z.boolean(),
  added_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});
export type RawProperty = z.infer<typeof RawPropertySchema>;

export const NewPropertySchema = RawPropertySchema.pick({
  title: true,
  description: true,
  listing_type: true,
  price: true,
  bedrooms: true,
  bathrooms: true,
  address: true,
  images: true,
});
export type NewProperty = z.infer<typeof NewPropertySchema>;

const EditablePropertyPropertiesSchema = RawPropertySchema.omit({
  id: true,
  added_at: true,
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
