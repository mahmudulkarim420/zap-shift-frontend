'use client';

import { usePathname } from "next/navigation";
import Navbar from "@/Navbar/Navbar";
import Footer from "@/Footer/Footer";

export default function LayoutClient({ children }) {
  const pathname = usePathname();
  
  // Check if current path is login or register
  const isAuthPage = pathname === '/login' || pathname === '/register';

  if (isAuthPage) {
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
