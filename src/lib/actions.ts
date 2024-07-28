import { sql } from "@vercel/postgres";
import type {
  EditableUser,
  EditableProperty,
  NewUser,
  NewProperty,
  RawProperty,
} from "./definitons";

export async function insertUser(payload: NewUser): Promise<void> {
  const { username, password, firstname, lastname } = payload;

  const bcrypt = require("bcrypt");
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await sql`
      INSERT INTO users (username, password, firstname, lastname)
      VALUES (${username}, ${hashedPassword}, ${firstname}, ${lastname});
    `;
  } catch (error) {
    console.error("Database Error:\n", error);
    throw new Error("Failed to insert user.");
  }
}

/**
 * Updates a User property in the database.
 *
 * @param userId - The unique identifier of the user.
 * @param property - The property to update (e.g., 'username', 'email', etc.).
 * @param newValue - The new value for the specified property.
 * @throws Error if the update fails.
 */
export async function updateUserProp<K extends keyof EditableUser>(
  userId: string,
  property: K,
  newValue: EditableUser[K]
): Promise<void> {
  let value: any = newValue;
  switch (property) {
    case "password":
      const bcrypt = require("bcrypt");
      value = await bcrypt.hash(newValue, 10);
      break;
    case "favorites" || "wishlist":
      if (newValue instanceof Array) {
        value = newValue.join(", ");
      }
      break;
    default:
      break;
  }
  try {
    await sql`
      UPDATE users
      SET
        ${property} = ${value},
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${userId};
    `;
  } catch (error) {
    console.error("Database Error:\n", error);
    throw new Error("Failed to update user.");
  }
}

/**
 * Updates User properties in the database.
 *
 * @param userId - The unique identifier of the user.
 * @param payload - An object containing properties to update (e.g., 'username', 'email', etc.).
 * @throws Error if the update fails.
 */
export async function updateUser(
  userId: string,
  payload: EditableUser
): Promise<void> {
  try {
    const keys = Object.keys(payload) as (keyof EditableUser)[];
    await sql`
      UPDATE users
      SET
        ${keys.map((key) => key + " = " + payload[key]).join(",")},
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${userId};
    `;
  } catch (error) {
    console.error("Database Error:\n", error);
    throw new Error("Failed to update user.");
  }
}

export async function insertPropertyGetId(
  payload: NewProperty & { agent_id: string }
): Promise<string> {
  const {
    agent_id,
    title,
    description,
    listing_type,
    price,
    bedrooms,
    bathrooms,
    address,
  } = payload;
  try {
    const { rows } = await sql<RawProperty>`
      INSERT INTO properties (agent_id, title, description, listing_type, price, bedrooms, bathrooms, address)
      VALUES (${agent_id}, ${title}, ${description}, ${listing_type}, ${price}, ${bedrooms}, ${bathrooms}, ${address})
      RETURNING id;
    `;
    return rows[0].id;
  } catch (error) {
    console.error("Error inserting property:", error);
    throw error;
  }
}

export async function updatePropertyBanner(
  propertyId: string,
  bannerUrl: string
): Promise<void> {
  try {
    await sql`
      UPDATE properties
      SET
        banner_url = ${bannerUrl},
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${propertyId};
    `;
  } catch (error) {
    console.error("Database Error:\n", error);
    throw new Error("Failed to update property banner.");
  }
}

/**
 * Updates Real Estate Property properties in the database.
 *
 * @param propertyId - The unique identifier of the property.
 * @param payload - An object containing properties to update (e.g., 'price', 'description', etc.).
 * @throws Error if the update fails.
 */
export async function updateProperty(
  propertyId: string,
  payload: EditableProperty
): Promise<void> {
  try {
    const keys = Object.keys(payload) as (keyof EditableProperty)[];
    await sql`
      UPDATE properties
      SET
        ${keys.map((key) => key + " = " + payload[key]).join(",")},
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${propertyId};
    `;
  } catch (error) {
    console.error("Database Error:\n", error);
    throw new Error("Failed to update user.");
  }
}
