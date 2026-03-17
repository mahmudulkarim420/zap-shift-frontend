'use client';

import RoleGuard from "@/components/RoleGuard";
import DashboardLayout from "@/components/Dashboard/DashboardLayout";

export default function AdminDashboard() {
  return (
    <RoleGuard allowedRoles={['admin']}>
      <DashboardLayout roleName="Admin">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 shadow-sm">
            <h3 className="text-sm font-semibold text-blue-800 uppercase tracking-widest mb-1">Total Users</h3>
            <p className="text-3xl font-extrabold text-blue-900">1,240</p>
          </div>
          <div className="p-6 bg-green-50 rounded-2xl border border-green-100 shadow-sm">
            <h3 className="text-sm font-semibold text-green-800 uppercase tracking-widest mb-1">Active Deliveries</h3>
            <p className="text-3xl font-extrabold text-green-900">85</p>
          </div>
          <div className="p-6 bg-orange-50 rounded-2xl border border-orange-100 shadow-sm">
            <h3 className="text-sm font-semibold text-orange-800 uppercase tracking-widest mb-1">Total Riders</h3>
            <p className="text-3xl font-extrabold text-orange-900">15</p>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Admin Panel Activities</h2>
          <div className="overflow-hidden border border-gray-100 rounded-xl">
             <table className="min-w-full divide-y divide-gray-100 bg-white">
                <thead className="bg-gray-50 uppercase text-xs font-semibold text-gray-500 tracking-wider">
                   <tr>
                      <th className="px-6 py-4 text-left">Action</th>
                      <th className="px-6 py-4 text-left">Target</th>
                      <th className="px-6 py-4 text-left">Timestamp</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm text-gray-600">
                   <tr>
                      <td className="px-6 py-4">User Status Updated</td>
                      <td className="px-6 py-4 text-gray-900 font-medium">@JohnDoe</td>
                      <td className="px-6 py-4">2 mins ago</td>
                   </tr>
                   <tr>
                      <td className="px-6 py-4">New Service Created</td>
                      <td className="px-6 py-4 text-gray-900 font-medium font-bold">Priority Plus</td>
                      <td className="px-6 py-4">4 mins ago</td>
                   </tr>
                </tbody>
             </table>
          </div>
        </div>
      </DashboardLayout>
    </RoleGuard>
  );
}
