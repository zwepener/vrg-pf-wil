import { FooterNav, TopNav } from "@/components/ui/nav/nav";
import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <TopNav />
      <main>
        <article>{children}</article>
      </main>
      <FooterNav />
    </>
  );
}
