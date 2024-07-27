"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import FaIcon from "../fa-icon";

export default function ProfileMenu() {
  const { data, status } = useSession();

  const avatarFallback = data ? (
    data.user.firstname[0].toUpperCase() + data.user.lastname[0].toUpperCase()
  ) : (
    <FaIcon variant="regular" icon="user" />
  );

  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <Avatar>
            <AvatarImage src={data?.user.avatar_url ?? undefined} />
            <AvatarFallback>{avatarFallback}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {status === "authenticated" && (
            <DropdownMenuItem
              onClick={() => router.push("/profile")}
              className="cursor-pointer space-x-2"
            >
              <FaIcon variant="regular" icon="user" />
              <span>Profile</span>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem
            onClick={() => router.push("/settings")}
            className="cursor-pointer space-x-2"
          >
            <FaIcon icon="gear" />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        {status === "authenticated" ? (
          <DropdownMenuItem
            onClick={() => signOut()}
            className="cursor-pointer space-x-2"
          >
            <FaIcon icon="arrow-right-from-bracket" />
            <span>Log out</span>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem
            onClick={() => router.push("/auth")}
            className="cursor-pointer space-x-2"
          >
            <FaIcon icon="arrow-right-to-bracket" />
            <span>Log in</span>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
