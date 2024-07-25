import { status501 } from "@/lib/response_codes";
import type { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
  return status501();
}
