"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { fetchUserById } from "@/lib/data";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Page({
  params: { id: userId },
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);

  const { password, ...user } = await fetchUserById(userId);

  if (session?.user.id === user.id) {
    redirect("/profile");
  }

  return (
    <ul>
      {Object.entries(user).map(([key, value]) => (
        <li key={key}>{`${key}: ${value}`}</li>
      ))}
    </ul>
  );
}
