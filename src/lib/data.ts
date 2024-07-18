import { sql } from "@vercel/postgres";
import type { Property, RawUser } from "./definitons";
import { isUUID } from "./utils";

/**
 * Fetches user information from the database.
 *
 * @param arg - The user ID or username.
 * @returns A Promise that resolves with the RawUser object, or rejects with an error.
 * @throws Error if fetching user data fails.
 */
export async function fetchUser(arg: string): Promise<RawUser> {
  const query = `SELECT * users WHERE ${
    isUUID(arg) ? "id" : "username"
  } = ${arg};`;
  try {
    const result = await sql<RawUser>`${query}`;
    return result.rows[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch user.");
  }
}

/**
 * Fetches a property from the database based on its ID.
 *
 * @param propertyId - The unique identifier of the property.
 * @returns A Promise that resolves with the Property object, or rejects with an error.
 * @throws Error if the property ID is invalid or if fetching the property fails.
 */
export async function fetchProperty(propertyId: string): Promise<Property> {
  if (!isUUID(propertyId))
    throw new Error("Received an invalid argument: " + propertyId);
  try {
    const result =
      await sql<Property>`SELECT * FROM properties WHERE id = ${propertyId};`;
    return result.rows[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch property.");
  }
}

/**
 * Fetches properties from the database.
 *
 * @param agentId - (Optional) The unique identifier of the agent. If provided, fetches properties managed by that agent.
 * @returns A Promise that resolves with an array of Property objects, or rejects with an error.
 * @throws Error if the agent ID is invalid or if fetching properties fails.
 */
export async function fetchProperties(agentId?: string): Promise<Property[]> {
  if (agentId && !isUUID(agentId))
    throw new Error("Received an invalid argument: " + agentId);
  try {
    const result = await sql<Property>`SELECT * FROM properties${
      agentId ? ` WHERE agent_id = ${agentId}` : ""
    };`;
    return result.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch properties.");
  }
}
