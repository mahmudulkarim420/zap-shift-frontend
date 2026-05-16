"use client";
import RoleGuard from "@/components/RoleGuard";
import RiderDashboard from "@/sections/Rider Dashboard/RiderDashboard";

export default function RiderDashboardPage() {
  return (
    <RoleGuard allowedRoles={["rider"]}>
      <RiderDashboard />
    </RoleGuard>
  );
}
