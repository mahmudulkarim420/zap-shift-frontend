'use client';

import { useEffect, useState } from 'react';
import RoleGuard from "@/components/RoleGuard";
import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import { authApi } from '@/api/auth';
import { Users, UserCheck, Bike } from 'lucide-react';

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
            activeUsers: allUsers.filter((user) => (user.status || 'active') === 'active').length,
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

  const getStatusBadge = (status) => {
    switch ((status || 'active').toLowerCase()) {
      case 'active':
        return 'bg-emerald-100 text-emerald-700 border border-emerald-200';
      case 'pending':
        return 'bg-amber-100 text-amber-700 border border-amber-200';
      case 'suspended':
        return 'bg-red-100 text-red-700 border border-red-200';
      case 'blocked':
        return 'bg-red-100 text-red-700 border border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border border-gray-200';
    }
  };

  return (
    <RoleGuard allowedRoles={['admin']}>
      <DashboardLayout roleName="Admin">
        {loading ? (
          <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
            <p className="text-sm font-medium text-gray-500">Loading dashboard...</p>
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-red-100 bg-red-50 p-8 shadow-sm">
            <p className="text-sm font-medium text-red-600">{error}</p>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">
                  Manage Users
                </h1>
                <p className="mt-1 text-sm md:text-base text-gray-500">
                  Manage and monitor all registered users from one place.
                </p>
              </div>

              <button className="w-fit rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90">
                View Reports
              </button>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-widest text-blue-700">
                      Total Users
                    </p>
                    <h3 className="mt-3 text-3xl font-extrabold text-blue-950">
                      {stats.totalUsers}
                    </h3>
                    <p className="mt-2 text-sm text-blue-700/80">
                      All registered accounts
                    </p>
                  </div>
                  <div className="rounded-xl bg-blue-100 p-3 text-blue-700">
                    <Users className="h-5 w-5" />
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-6 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-widest text-emerald-700">
                      Active Users
                    </p>
                    <h3 className="mt-3 text-3xl font-extrabold text-emerald-950">
                      {stats.activeUsers}
                    </h3>
                    <p className="mt-2 text-sm text-emerald-700/80">
                      Currently active accounts
                    </p>
                  </div>
                  <div className="rounded-xl bg-emerald-100 p-3 text-emerald-700">
                    <UserCheck className="h-5 w-5" />
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-orange-100 bg-orange-50 p-6 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-widest text-orange-700">
                      Total Riders
                    </p>
                    <h3 className="mt-3 text-3xl font-extrabold text-orange-950">
                      {stats.totalRiders}
                    </h3>
                    <p className="mt-2 text-sm text-orange-700/80">
                      Delivery team members
                    </p>
                  </div>
                  <div className="rounded-xl bg-orange-100 p-3 text-orange-700">
                    <Bike className="h-5 w-5" />
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">All Users</h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Manage and monitor all registered users from one place.
                  </p>
                </div>

                <div className="rounded-full bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600 border border-gray-100">
                  Total: {users.length}
                </div>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-gray-100">
                <table className="min-w-full bg-white">
                  <thead className="bg-gray-50">
                    <tr className="text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      <th className="px-6 py-4">Name</th>
                      <th className="px-6 py-4">Email</th>
                      <th className="px-6 py-4">Role</th>
                      <th className="px-6 py-4">Status</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100 text-sm text-gray-600">
                    {users.length > 0 ? (
                      users.map((user) => (
                        <tr
                          key={user._id || user.id}
                          className="transition hover:bg-gray-50/80"
                        >
                          <td className="px-6 py-4">
                            <div className="font-semibold text-gray-900">
                              {user.name}
                            </div>
                          </td>

                          <td className="px-6 py-4 text-gray-600">
                            {user.email}
                          </td>

                          <td className="px-6 py-4">
                            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold capitalize text-primary">
                              {user.role}
                            </span>
                          </td>

                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${getStatusBadge(
                                user.status
                              )}`}
                            >
                              {user.status || 'active'}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="4"
                          className="px-6 py-10 text-center text-sm text-gray-500"
                        >
                          No users found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </DashboardLayout>
    </RoleGuard>
  );
}