"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { normalizeRole } from "@/utils/roleUtils";

/**
 * RoleGuard — wraps any route/component and enforces role-based access.
 *
 * Usage:
 *   <RoleGuard allowedRoles={["admin"]}>
 *     <AdminOnlyContent />
 *   </RoleGuard>
 */
export default function RoleGuard({ allowedRoles = [], children, fallbackUrl = "/sign-in" }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const userRole = normalizeRole(session?.user?.role);
  const isAllowed = allowedRoles.includes(userRole);

  useEffect(() => {
    if (status === "loading") return;

    if (status === "unauthenticated") {
      router.replace(fallbackUrl);
      return;
    }

    if (status === "authenticated" && !isAllowed) {
      // Redirect to the user's own dashboard instead of a blank 403
      const homeByRole = {
        admin: "/dashboard/admin",
        rider: "/dashboard/rider",
        user: "/dashboard/user",
      };
      router.replace(homeByRole[userRole] || "/dashboard");
    }
  }, [status, isAllowed, userRole, router, fallbackUrl]);

  // Loading skeleton
  if (status === "loading") {
    return (
      <div className="min-h-[400px] flex flex-col gap-4 p-6 animate-pulse">
        <div className="h-8 bg-gray-100 rounded-xl w-1/3"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-100 rounded-2xl"></div>
          ))}
        </div>
        <div className="h-64 bg-gray-100 rounded-2xl mt-4"></div>
      </div>
    );
  }

  // Unauthorized — show brief message while redirect fires
  if (status === "unauthenticated" || !isAllowed) {
    return (
      <div className="min-h-[400px] flex items-center justify-center flex-col gap-4">
        <div className="text-5xl">🔒</div>
        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Access Restricted</p>
        <p className="text-gray-500 text-sm">Redirecting you to your dashboard…</p>
      </div>
    );
  }

  return <>{children}</>;
}
