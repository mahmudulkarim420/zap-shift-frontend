"use client";
import RoleGuard from "@/components/RoleGuard";
import UserDashboard from "@/sections/User Dashboard/UserDashboard";

export default function UserDashboardPage() {
  return (
    <RoleGuard allowedRoles={["user"]}>
      <UserDashboard />
    </RoleGuard>
  );
}
