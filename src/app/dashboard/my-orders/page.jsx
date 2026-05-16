"use client";
import RoleGuard from "@/components/RoleGuard";
import MyOrders from "@/sections/User Dashboard/MyOrders";

export default function MyOrdersPage() {
  return (
    <RoleGuard allowedRoles={["user"]}>
      <MyOrders />
    </RoleGuard>
  );
}
