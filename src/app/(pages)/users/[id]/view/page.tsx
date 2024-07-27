"use server";

import { fetchUserById } from "@/lib/data";

export default async function Page({
  params: { id: userId },
}: {
  params: { id: string };
}) {
  const { password, ...user } = await fetchUserById(userId);
  return (
    <ul>
      {Object.entries(user).map(([key, value]) => (
        <li key={key}>{`${key}: ${value}`}</li>
      ))}
    </ul>
  );
}
