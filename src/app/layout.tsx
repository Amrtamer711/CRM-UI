import type { Metadata } from "next";
import "./globals.css";
import AppShell from "@/components/AppShell";

export const metadata: Metadata = {
  title: "Nexus CRM | AI-Powered Customer Platform",
  description: "A modern CRM platform built for the next generation of customer relationships.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-[var(--void-950)]">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
