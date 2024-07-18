import { sql } from "@vercel/postgres";
import type {
  EditableUserProperties,
  EditablePropertyProperties,
} from "./definitons";
import { isUUID } from "./utils";

/**
 * Updates a User property in the database.
 *
 * @param userId - The unique identifier of the user.
 * @param property - The property to update (e.g., 'username', 'email', etc.).
 * @param newValue - The new value for the specified property.
 * @throws Error if the user ID is invalid or if the update fails.
 */
export async function updateUserProp<K extends keyof EditableUserProperties>(
  userId: string,
  property: K,
  newValue: EditableUserProperties[K]
): Promise<void> {
  if (!isUUID(userId))
    throw new Error("Received an invalid argument: " + userId);
  try {
    await sql`
      UPDATE users
      SET
        ${property} = ${newValue},
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${userId};
    `;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to update user.");
  }
}

/**
 * Updates User properties in the database.
 *
 * @param userId - The unique identifier of the user.
 * @param payload - An object containing properties to update (e.g., 'username', 'email', etc.).
 * @throws Error if the user ID is invalid or if the update fails.
 */
export async function updateUser(
  userId: string,
  payload: EditableUserProperties
): Promise<void> {
  if (!isUUID(userId))
    throw new Error("Received an invalid argument: " + userId);
  try {
    const keys = Object.keys(payload) as (keyof EditableUserProperties)[];
    await sql`
      UPDATE users
      SET
        ${keys.map((key) => key + " = " + payload[key]).join(",")},
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${userId};
    `;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to update user.");
  }
}

/**
 * Updates a Real Estate Property property in the database.
 *
 * @param propertyId - The unique identifier of the property.
 * @param property - The property to update (e.g., 'price', 'description', etc.).
 * @param newValue - The new value for the specified property.
 * @throws Error if the property ID is invalid or if the update fails.
 */
export async function updatePropertyProp<
  K extends keyof EditablePropertyProperties
>(
  propertyId: string,
  property: K,
  newValue: EditablePropertyProperties[K]
): Promise<void> {
  if (!isUUID(propertyId))
    throw new Error("Received an invalid argument: " + propertyId);
  try {
    await sql`
      UPDATE properties
      SET
        ${property} = ${newValue},
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${propertyId}
    `;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to update property.");
  }
}

/**
 * Updates Real Estate Property properties in the database.
 *
 * @param propertyId - The unique identifier of the property.
 * @param payload - An object containing properties to update (e.g., 'price', 'description', etc.).
 * @throws Error if the property ID is invalid or if the update fails.
 */
export async function updateProperty(
  propertyId: string,
  payload: EditablePropertyProperties
): Promise<void> {
  if (!isUUID(propertyId))
    throw new Error("Received an invalid argument: " + propertyId);
  try {
    const keys = Object.keys(payload) as (keyof EditablePropertyProperties)[];
    await sql`
      UPDATE properties
      SET
        ${keys.map((key) => key + " = " + payload[key]).join(",")},
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${propertyId};
    `;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to update user.");
  }
}
