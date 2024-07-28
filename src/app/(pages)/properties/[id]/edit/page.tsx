"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { fetchProperty } from "@/lib/data";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import EditForm from "./form";

export default async function Page({
  params: { id: propertyId },
}: {
  params: { id: string };
}) {
  const property = await fetchProperty(propertyId);

  const session = await getServerSession(authOptions);
  if (
    !session ||
    !(session.user.role === "admin" || session.user.id === property.id)
  ) {
    return redirect(`/properties/${propertyId}/view`);
  }

  return (
    <div className="p-5">
      <EditForm property={property} />
    </div>
  );
}
