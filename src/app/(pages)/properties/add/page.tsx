"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import AddForm from "./form";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) return redirect("/auth?callbackUrl=/properties/add");
  else if (session.user.role === "user") return redirect("/");

  return (
    <div className="flex flex-col items-center p-5 m-5 grow">
      <AddForm />
    </div>
  );
}
