'use client';

import RoleGuard from "@/components/RoleGuard";
import DashboardLayout from "@/components/Dashboard/DashboardLayout";

export default function UserDashboard() {
  return (
    <RoleGuard allowedRoles={['user']}>
      <DashboardLayout roleName="User">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-8 bg-purple-50 rounded-2xl border border-purple-100 shadow-sm transition hover:bg-purple-100 hover:scale-[1.02]">
            <h3 className="text-sm font-semibold text-purple-800 uppercase tracking-widest mb-1">Total Packages Sent</h3>
            <p className="text-4xl font-extrabold text-purple-900">25</p>
          </div>
          <div className="p-8 bg-blue-50 rounded-2xl border border-blue-100 shadow-sm transition hover:bg-blue-100 hover:scale-[1.02]">
            <h3 className="text-sm font-semibold text-blue-800 uppercase tracking-widest mb-1">Active Deliveries</h3>
            <p className="text-4xl font-extrabold text-blue-900">3</p>
          </div>
        </div>
        <div className="mt-12 bg-white rounded-2xl border border-gray-100 shadow-sm p-8 overflow-hidden">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight mb-8">Your Recent Shipments</h2>
          <div className="space-y-4">
             <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
                <div className="flex items-center gap-4">
                   <div className="bg-primary p-3 rounded-lg text-black font-extrabold shadow-sm">#102</div>
                   <div>
                      <p className="text-gray-900 font-bold">Priority Express</p>
                      <p className="text-sm text-gray-500 font-medium">Delivered correctly</p>
                   </div>
                </div>
                <div className="text-right">
                   <p className="text-sm text-gray-500 font-semibold mb-1">Arrived on Mar 15</p>
                   <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Delivered</span>
                </div>
             </div>
             <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
                <div className="flex items-center gap-4">
                   <div className="bg-primary p-3 rounded-lg text-black font-extrabold shadow-sm">#105</div>
                   <div>
                      <p className="text-gray-900 font-bold">Standard Delivery</p>
                      <p className="text-sm text-gray-500 font-medium font-medium">In Transit - Expected Today</p>
                   </div>
                </div>
                <div className="text-right">
                   <p className="text-sm text-gray-500 font-semibold mb-1">Shipment in Progress</p>
                   <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Active</span>
                </div>
             </div>
          </div>
        </div>
      </DashboardLayout>
    </RoleGuard>
  );
}
