"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import FaIcon from "../fa-icon";
import NavLinks from "./nav-links";

export default function MenuSheet({ className }: { className?: string }) {
  return (
    <Sheet>
      <SheetTrigger
        className={cn("flex flex-col items-center space-x-1", className)}
      >
        <FaIcon icon="bars" />
        <span>Menu</span>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
          <SheetDescription>
            Select a page you wish to navigate to.
          </SheetDescription>
        </SheetHeader>
        <NavLinks />
      </SheetContent>
    </Sheet>
  );
}
