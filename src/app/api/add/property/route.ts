import { PropertySchema, type Property } from "@/lib/definitons";
import { status401, status501 } from "@/lib/response_codes";
import { getToken } from "next-auth/jwt";
import type { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
  const token = await getToken({ req: request });
  if (!token) return status401();

  const rawData: Property = await request.json();
  const {
    data: parsedData,
    success,
    error,
  } = PropertySchema.safeParse(rawData);
  return status501();
}
