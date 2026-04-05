import AdminDashboard from "@/sections/Admin Dashboard/AdminDashboard";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function AdminDashboardPage() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <AdminDashboard />
    </ProtectedRoute>
  );
}
