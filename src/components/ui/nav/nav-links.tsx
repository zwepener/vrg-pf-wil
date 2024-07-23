"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Service", href: "/service" },
  { name: "Properties", href: "/properties" },
  { name: "Contact", href: "/contact" },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <div className="navbar-list">
      {links.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className={cn("navbar-link", {
            active: pathname === link.href,
          })}
          data-nav-link
        >
          {link.name}
        </Link>
      ))}
    </div>
  );
}
