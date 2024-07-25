import { insertPropertyGetId, updatePropertyBanner } from "@/lib/actions";
import { AddPropertyAPISchema } from "@/lib/definitons";
import {
  status201,
  status400,
  status401,
  status500,
} from "@/lib/response_codes";
import { put } from "@vercel/blob";
import { getToken } from "next-auth/jwt";
import type { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
  const token = await getToken({ req: request });
  if (!token || token.user.role === "user") return status401();

  const { id: userId } = token.user;

  const formData = await request.formData();
  const {
    data: parsedFormData,
    success,
    error,
  } = AddPropertyAPISchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    listing_type: formData.get("listing_type"),
    price: parseFloat(formData.get("price") as string),
    bedrooms: parseInt(formData.get("bedrooms") as string),
    bathrooms: parseInt(formData.get("bathrooms") as string),
    address: formData.get("address"),
    banner: formData.get("banner"),
  });
  if (!success) {
    return status400({
      errors: error.flatten().fieldErrors,
      title: "Invalid Form Field Values",
      description: "The server did not receive the data that it expected to.",
    });
  }
  try {
    const { banner, ...payload } = parsedFormData;
    const propertyId = await insertPropertyGetId({
      ...payload,
      agent_id: userId,
    });
    const filePath = `properties/${propertyId}/banner.${banner.name
      .split(".")
      .pop()}`;
    const { url: bannerUrl } = await put(filePath, banner, {
      access: "public",
      addRandomSuffix: false,
    });
    await updatePropertyBanner(propertyId, bannerUrl);
    return status201({
      title: "Property Added",
      description:
        "A property was successfully added. You might need to refresh the page to see it.",
    });
  } catch (error) {
    return status500();
  }
}
