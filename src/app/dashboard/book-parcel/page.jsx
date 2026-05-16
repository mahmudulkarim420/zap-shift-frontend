"use client";
import RoleGuard from "@/components/RoleGuard";
import BookParcel from "@/sections/User Dashboard/BookParcel";

export default function BookParcelPage() {
  return (
    <RoleGuard allowedRoles={["user"]}>
      <BookParcel />
    </RoleGuard>
  );
}
