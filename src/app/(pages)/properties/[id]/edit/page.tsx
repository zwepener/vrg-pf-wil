"use server";

import { fetchProperty } from "@/lib/data";
import EditForm from "./form";

export default async function Page({ params }: { params: { id: string } }) {
  const property = await fetchProperty(params.id);
  return (
    <div className="p-5">
      <EditForm property={property} />
    </div>
  );
}
