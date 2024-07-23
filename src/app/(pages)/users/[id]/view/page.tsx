"use server";

import { fetchUserById } from "@/lib/data";

export default async function Page({ params }: { params: { id: string } }) {
  const user = await fetchUserById(params.id);
  return (
    <ul>
      {Object.entries(user).map(([key, value]) => (
        <li key={key}>{`${key}: ${value}`}</li>
      ))}
    </ul>
  );
}
