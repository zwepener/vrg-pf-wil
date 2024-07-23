import { z } from "zod";

export const RawUserSchema = z.object({
  id: z.string(),
  username: z
    .string()
    .min(1, "Username is empty.")
    .max(255, "Username is too long (Max is 255 characters)."),
  password: z.string().min(1, "Password is empty."),
  firstname: z
    .string()
    .min(1, "Firstname is empty.")
    .max(255, "Firstname is too long (Max is 255 characters)."),
  lastname: z
    .string()
    .min(1, "Lastname is empty.")
    .max(255, "Lastname is too long (Max is 255 characters)."),
  email: z.string().email("Not a valid email.").nullable(),
  avatar_url: z.string().url().nullable(),
  favorites: z.array(z.string()).nullable(),
  wishlist: z.array(z.string()).nullable(),
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
}).extend({
  images: z.array(
    z
      .instanceof(File)
      .refine(
        (file) => /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(file.name),
        "We only support image uploads."
      )
      .refine(
        (file) => file.size <= 1024 * 1024 * 4.5,
        "File is bigger than 4.5 MB."
      )
  ),
});
export type NewProperty = z.infer<typeof NewPropertySchema>;

const EditablePropertyPropertiesSchema = RawPropertySchema.omit({
  id: true,
  images: true,
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
