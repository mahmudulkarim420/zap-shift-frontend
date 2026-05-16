"use client";
import RoleGuard from "@/components/RoleGuard";
import WorkProfile from "@/sections/Rider Dashboard/WorkProfile";

export default function WorkProfilePage() {
  return (
    <RoleGuard allowedRoles={["rider"]}>
      <WorkProfile />
    </RoleGuard>
  );
}
