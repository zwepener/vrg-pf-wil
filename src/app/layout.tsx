import AuthProvider from "@/components/auth-provider";
import { FooterNav, TopNav } from "@/components/ui/nav/nav";
import { Toaster } from "@/components/ui/toast/toaster";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./temp_global.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Realhome",
  description: "A Real Estate Listing Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable
        )}
      >
        <AuthProvider>
          <TopNav />
          <main>
            <article>{children}</article>
          </main>
          <FooterNav />
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
