import { insertUser } from "@/lib/actions";
import { fetchUserByUsername } from "@/lib/data";
import { NewUserSchema } from "@/lib/definitons";
import { status201, status400, status500 } from "@/lib/response_codes";
import type { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
  const rawData = await request.json();
  const { data: parsedData, success, error } = NewUserSchema.safeParse(rawData);
  if (!success)
    return status400({
      errors: error.flatten().fieldErrors,
      title: "Invalid Form Field Values",
      description: "The server did not receive the data that it expected to.",
    });
  try {
    const existingUser = await fetchUserByUsername(parsedData.username);
    if (existingUser)
      return status400({
        title: "Username In Use",
        description: "An account using that username already exists.",
      });
    await insertUser(parsedData);
    return status201({
      title: "Account Created",
      description:
        "Your account was successfully created. You may now proceed to log in.",
    });
  } catch (error) {
    return status500();
  }
}
