import RiderDashboard from "@/sections/Rider Dashboard/RiderDashboard";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function RiderDashboardPage() {
  return (
    <ProtectedRoute allowedRoles={['rider']}>
      <RiderDashboard />
    </ProtectedRoute>
  );
}
