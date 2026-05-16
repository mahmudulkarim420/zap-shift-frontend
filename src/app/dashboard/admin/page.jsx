"use client";
import RoleGuard from "@/components/RoleGuard";
import AdminDashboard from "@/sections/Admin Dashboard/AdminDashboard";

export default function AdminDashboardPage() {
  return (
    <RoleGuard allowedRoles={["admin"]}>
      <AdminDashboard />
    </RoleGuard>
  );
}
