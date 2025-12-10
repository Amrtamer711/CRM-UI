import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

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
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 ml-[260px]">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
