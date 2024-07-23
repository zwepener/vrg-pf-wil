import { sql } from "@vercel/postgres";
import type { RawProperty, RawUser } from "./definitons";

/**
 * Fetches user information from the database.
 *
 * @param userId - The user ID.
 * @returns A Promise that resolves with the RawUser object, or rejects with an error.
 * @throws Error if fetching user data fails.
 */
export async function fetchUserById(userId: string): Promise<RawUser> {
  try {
    const result = await sql<RawUser>`
      SELECT *
      FROM users
      WHERE id = ${userId};
    `;
    return result.rows[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch user.");
  }
}

/**
 * Fetches user information from the database.
 *
 * @param username - The user Username.
 * @returns A Promise that resolves with the RawUser object, or rejects with an error.
 * @throws Error if fetching user data fails.
 */
export async function fetchUserByUsername(username: string): Promise<RawUser> {
  try {
    const result = await sql<RawUser>`
      SELECT *
      FROM users
      WHERE username = ${username};
    `;
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
 * @returns A Promise that resolves with the RawProperty object, or rejects with an error.
 * @throws Error if fetching the property fails.
 */
export async function fetchProperty(propertyId: string): Promise<RawProperty> {
  try {
    const result = await sql<RawProperty>`
        SELECT *
        FROM properties
        WHERE id = ${propertyId};
      `;
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
 * @returns A Promise that resolves with an array of RawProperty objects, or rejects with an error.
 * @throws Error if fetching properties fails.
 */
export async function fetchProperties(
  agentId?: string
): Promise<RawProperty[]> {
  try {
    const result = await sql<RawProperty>`
      SELECT *
      FROM properties${
        agentId
          ? `
      WHERE agent_id = ${agentId}`
          : ""
      };
    `;
    return result.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch properties.");
  }
}
