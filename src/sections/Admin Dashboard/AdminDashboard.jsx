'use client';

import { useEffect, useState } from 'react';
import RoleGuard from "@/components/RoleGuard";
import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import { authApi } from '@/api/auth';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalRiders: 0,
    activeUsers: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError('');

        const res = await authApi.getUsers();

        if (res.success) {
          const allUsers = res.data || [];
          setUsers(allUsers);

          setStats({
            totalUsers: allUsers.length,
            totalRiders: allUsers.filter((user) => user.role === 'rider').length,
            activeUsers: allUsers.filter((user) => user.status === 'active').length,
          });
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <RoleGuard allowedRoles={['admin']}>
      <DashboardLayout roleName="Admin">
        {loading ? (
          <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-gray-600">Loading dashboard...</p>
          </div>
        ) : error ? (
          <div className="p-6 bg-red-50 rounded-2xl border border-red-100 shadow-sm">
            <p className="text-red-600">{error}</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 shadow-sm">
                <h3 className="text-sm font-semibold text-blue-800 uppercase tracking-widest mb-1">
                  Total Users
                </h3>
                <p className="text-3xl font-extrabold text-blue-900">{stats.totalUsers}</p>
              </div>

              <div className="p-6 bg-green-50 rounded-2xl border border-green-100 shadow-sm">
                <h3 className="text-sm font-semibold text-green-800 uppercase tracking-widest mb-1">
                  Active Users
                </h3>
                <p className="text-3xl font-extrabold text-green-900">{stats.activeUsers}</p>
              </div>

              <div className="p-6 bg-orange-50 rounded-2xl border border-orange-100 shadow-sm">
                <h3 className="text-sm font-semibold text-orange-800 uppercase tracking-widest mb-1">
                  Total Riders
                </h3>
                <p className="text-3xl font-extrabold text-orange-900">{stats.totalRiders}</p>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-bold text-gray-800 mb-6">All Users</h2>

              <div className="overflow-hidden border border-gray-100 rounded-xl">
                <table className="min-w-full divide-y divide-gray-100 bg-white">
                  <thead className="bg-gray-50 uppercase text-xs font-semibold text-gray-500 tracking-wider">
                    <tr>
                      <th className="px-6 py-4 text-left">Name</th>
                      <th className="px-6 py-4 text-left">Email</th>
                      <th className="px-6 py-4 text-left">Role</th>
                      <th className="px-6 py-4 text-left">Status</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100 text-sm text-gray-600">
                    {users.length > 0 ? (
                      users.map((user) => (
                        <tr key={user._id || user.id}>
                          <td className="px-6 py-4 text-gray-900 font-medium">
                            {user.name}
                          </td>
                          <td className="px-6 py-4">{user.email}</td>
                          <td className="px-6 py-4 capitalize">{user.role}</td>
                          <td className="px-6 py-4">
                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 capitalize">
                              {user.status || 'active'}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="px-6 py-6 text-center text-gray-500">
                          No users found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </DashboardLayout>
    </RoleGuard>
  );
}