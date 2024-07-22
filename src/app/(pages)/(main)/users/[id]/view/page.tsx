"use server";

import { fetchUser } from "@/lib/data";

export default async function Page({ params }: { params: { id: string } }) {
  const user = await fetchUser(params.id);
  return (
    <ul>
      {Object.entries(user).map(([key, value]) => (
        <li>{`${key}: ${value}`}</li>
      ))}
    </ul>
  );
}
