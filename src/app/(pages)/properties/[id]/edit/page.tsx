"use server";

import { fetchProperty } from "@/lib/data";

export default async function Page({ params }: { params: { id: string } }) {
  const property = await fetchProperty(params.id);
  return (
    <ul>
      {Object.entries(property).map(([key, value]) => (
        <li key={key}>{`${key}: ${value}`}</li>
      ))}
    </ul>
  );
}
