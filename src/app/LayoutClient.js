"use client";

import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import Navbar from "@/Navbar/Navbar";
import Footer from "@/Footer/Footer";

export default function LayoutClient({ children }) {
  const pathname = usePathname();
  const { status } = useSession();

  const isAuthPage = pathname === "/sign-in" || pathname === "/sign-up";
  const isDashboardPage = pathname.startsWith("/dashboard");

  // Auth pages and dashboard pages use their own layouts
  if (isAuthPage || isDashboardPage) {
    return <>{children}</>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Navbar />

      <main>{children}</main>

      <Footer />
    </div>
  );
}
