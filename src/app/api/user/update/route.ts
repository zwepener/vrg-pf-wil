import { NewUserSchema, type NewUser } from "@/lib/definitons";
import { status400, status401, status501 } from "@/lib/response_codes";
import { getToken } from "next-auth/jwt";
import type { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
  const token = await getToken({ req: request });
  if (!token) return status401();
  const { id: userId } = token.user;

  const rawData = (await request.json()) as NewUser;
  const { data: parsedData, success, error } = NewUserSchema.safeParse(rawData);
  if (!success) return status400();
  return status501();
}
