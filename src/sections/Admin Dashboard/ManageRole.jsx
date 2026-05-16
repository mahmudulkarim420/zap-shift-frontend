"use client";


import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import { Shield, User, Bike, Crown, Search, Filter, RefreshCcw } from "lucide-react";

const users = [
  {
    id: "USR-101",
    name: "John Doe",
    email: "john@example.com",
    role: "user",
  },
  {
    id: "USR-102",
    name: "Sarah Khan",
    email: "sarah@example.com",
    role: "rider",
  },
  {
    id: "USR-103",
    name: "Admin One",
    email: "admin@example.com",
    role: "admin",
  },
  {
    id: "USR-104",
    name: "Nayeem Hasan",
    email: "nayeem@example.com",
    role: "user",
  },
];

const getRoleBadge = (role) => {
  switch (role) {
    case "admin":
      return "bg-violet-100 text-violet-700 border border-violet-200";
    case "rider":
      return "bg-orange-100 text-orange-700 border border-orange-200";
    default:
      return "bg-blue-100 text-blue-700 border border-blue-200";
  }
};

const getRoleIcon = (role) => {
  switch (role) {
    case "admin":
      return <Crown className="w-4 h-4" />;
    case "rider":
      return <Bike className="w-4 h-4" />;
    default:
      return <User className="w-4 h-4" />;
  }
};

export default function ManageRole() {
  return (
    <DashboardLayout roleName="Admin">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">Manage Roles</h1>
              <p className="mt-1 text-sm md:text-base text-gray-500">
                Control user permissions and assign roles across the platform.
              </p>
            </div>

            <button className="w-fit rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white hover:opacity-90 transition">
              Refresh Roles
            </button>
          </div>

          {/* Top Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="p-6 bg-blue-50 border border-blue-100 rounded-2xl shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-semibold text-blue-700 uppercase">Users</p>
                  <h3 className="text-3xl font-extrabold text-blue-950 mt-2">124</h3>
                </div>
                <div className="bg-blue-100 p-3 rounded-xl text-blue-700">
                  <User className="w-5 h-5" />
                </div>
              </div>
            </div>

            <div className="p-6 bg-orange-50 border border-orange-100 rounded-2xl shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-semibold text-orange-700 uppercase">Riders</p>
                  <h3 className="text-3xl font-extrabold text-orange-950 mt-2">32</h3>
                </div>
                <div className="bg-orange-100 p-3 rounded-xl text-orange-700">
                  <Bike className="w-5 h-5" />
                </div>
              </div>
            </div>

            <div className="p-6 bg-violet-50 border border-violet-100 rounded-2xl shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-semibold text-violet-700 uppercase">Admins</p>
                  <h3 className="text-3xl font-extrabold text-violet-950 mt-2">3</h3>
                </div>
                <div className="bg-violet-100 p-3 rounded-xl text-violet-700">
                  <Shield className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">User Roles</h2>
                <p className="text-sm text-gray-500 mt-1">Update and manage roles for all users.</p>
              </div>

              <div className="flex gap-3">
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl">
                  <Search className="w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search user..."
                    className="bg-transparent outline-none text-sm"
                  />
                </div>

                <button className="flex items-center gap-2 px-4 py-2 border rounded-xl text-sm text-gray-700 hover:bg-gray-50">
                  <Filter className="w-4 h-4" />
                  Filter
                </button>
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-gray-100">
              <table className="min-w-full">
                <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                  <tr>
                    <th className="px-6 py-4 text-left">Name</th>
                    <th className="px-6 py-4 text-left">Email</th>
                    <th className="px-6 py-4 text-left">Role</th>
                    <th className="px-6 py-4 text-center">Change Role</th>
                  </tr>
                </thead>

                <tbody className="divide-y text-sm">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 font-semibold text-gray-900">{user.name}</td>
                      <td className="px-6 py-4 text-gray-600">{user.email}</td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold capitalize ${getRoleBadge(
                            user.role,
                          )}`}
                        >
                          {getRoleIcon(user.role)}
                          {user.role}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-center">
                        <select className="px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                          <option>User</option>
                          <option>Rider</option>
                          <option>Admin</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </DashboardLayout>
  );
}
