'use client';

import RoleGuard from "@/components/RoleGuard";
import DashboardLayout from "@/components/Dashboard/DashboardLayout";

export default function AllParcels() {
  return (
    <RoleGuard allowedRoles={['admin']}>
      <DashboardLayout roleName="Admin">
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-6">All Parcels</h2>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-gray-500">Parcel management features will be here.</p>
          </div>
        </div>
      </DashboardLayout>
    </RoleGuard>
  );
}
