"use client";
import AdminDashboard from "@/sections/Admin Dashboard/AdminDashboard";

export default function StatisticsPage() {
  // Since AdminDashboard already shows stats, we can reuse it or create a dedicated stats view.
  // For now, let's just use the AdminDashboard as the base for stats.
  return <AdminDashboard />;
}
