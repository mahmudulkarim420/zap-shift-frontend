'use client';

import RoleGuard from "@/components/RoleGuard";
import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import AnalyticsChart from "@/components/Dashboard/AnalyticsChart";
import {
  Users,
  Bike,
  Package,
  TrendingUp,
  Clock3,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  UserPlus,
  Settings,
} from "lucide-react";

const stats = [
  {
    title: "Total Users",
    value: "1,240",
    change: "+12.5%",
    icon: Users,
    cardStyle: "bg-blue-50 border-blue-100",
    iconStyle: "bg-blue-100 text-blue-700",
    textStyle: "text-blue-900",
  },
  {
    title: "Total Riders",
    value: "158",
    change: "+8.2%",
    icon: Bike,
    cardStyle: "bg-orange-50 border-orange-100",
    iconStyle: "bg-orange-100 text-orange-700",
    textStyle: "text-orange-900",
  },
  {
    title: "Active Deliveries",
    value: "86",
    change: "+5.1%",
    icon: Package,
    cardStyle: "bg-emerald-50 border-emerald-100",
    iconStyle: "bg-emerald-100 text-emerald-700",
    textStyle: "text-emerald-900",
  },
  {
    title: "Growth Rate",
    value: "18.4%",
    change: "+2.4%",
    icon: TrendingUp,
    cardStyle: "bg-violet-50 border-violet-100",
    iconStyle: "bg-violet-100 text-violet-700",
    textStyle: "text-violet-900",
  },
];

const recentActivities = [
  {
    title: "New rider registration submitted",
    time: "5 minutes ago",
    type: "pending",
  },
  {
    title: "User status updated successfully",
    time: "12 minutes ago",
    type: "success",
  },
  {
    title: "Delivery request assigned to rider",
    time: "22 minutes ago",
    type: "info",
  },
  {
    title: "Suspicious login attempt detected",
    time: "1 hour ago",
    type: "warning",
  },
];

const recentUsers = [
  {
    name: "John Doe",
    email: "john@example.com",
    role: "user",
    status: "active",
  },
  {
    name: "Sarah Khan",
    email: "sarah@example.com",
    role: "rider",
    status: "pending",
  },
  {
    name: "Arian Smith",
    email: "arian@example.com",
    role: "user",
    status: "active",
  },
  {
    name: "Nayeem Hasan",
    email: "nayeem@example.com",
    role: "rider",
    status: "suspended",
  },
];

const quickActions = [
  {
    title: "Add New Admin",
    description: "Create and manage a new admin account",
    icon: UserPlus,
  },
  {
    title: "Review Riders",
    description: "Approve, reject, or suspend rider requests",
    icon: ShieldCheck,
  },
  {
    title: "System Settings",
    description: "Update platform controls and preferences",
    icon: Settings,
  },
];

const getStatusBadge = (status) => {
  switch (status) {
    case "active":
      return "bg-emerald-100 text-emerald-700";
    case "pending":
      return "bg-amber-100 text-amber-700";
    case "suspended":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const getActivityIcon = (type) => {
  switch (type) {
    case "success":
      return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
    case "warning":
      return <AlertTriangle className="w-4 h-4 text-amber-600" />;
    case "pending":
      return <Clock3 className="w-4 h-4 text-orange-600" />;
    default:
      return <ShieldCheck className="w-4 h-4 text-blue-600" />;
  }
};

export default function AdminDashboard() {
  return (
    <RoleGuard allowedRoles={["admin"]}>
      <DashboardLayout roleName="Admin">
        <div className="space-y-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">
                Dashboard Overview
              </h1>
              <p className="text-sm md:text-base text-gray-500 mt-1">
                Welcome back. Here is a quick summary of your platform activity.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button className="px-4 py-2 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-700 hover:bg-gray-50 transition">
                Export Report
              </button>
              <button className="px-4 py-2 rounded-xl bg-primary text-white text-sm font-semibold hover:opacity-90 transition">
                View Details
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {stats.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className={`rounded-2xl border p-5 shadow-sm ${item.cardStyle}`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        {item.title}
                      </p>
                      <h3 className={`mt-2 text-3xl font-extrabold ${item.textStyle}`}>
                        {item.value}
                      </h3>
                      <p className="mt-2 text-xs font-semibold text-emerald-600">
                        {item.change} this month
                      </p>
                    </div>

                    <div className={`p-3 rounded-xl ${item.iconStyle}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    Platform Summary
                  </h2>
                  <p className="text-sm text-gray-500">
                    Current operational snapshot of your system
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold">
                  Live Overview
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-2xl bg-gray-50 p-5 border border-gray-100">
                  <p className="text-sm text-gray-500">Pending Approvals</p>
                  <h3 className="mt-2 text-2xl font-bold text-gray-900">24</h3>
                  <p className="mt-1 text-xs text-amber-600">
                    Needs admin attention
                  </p>
                </div>

                <div className="rounded-2xl bg-gray-50 p-5 border border-gray-100">
                  <p className="text-sm text-gray-500">Completed Deliveries</p>
                  <h3 className="mt-2 text-2xl font-bold text-gray-900">430</h3>
                  <p className="mt-1 text-xs text-emerald-600">
                    Strong delivery performance
                  </p>
                </div>

                <div className="rounded-2xl bg-gray-50 p-5 border border-gray-100">
                  <p className="text-sm text-gray-500">Support Tickets</p>
                  <h3 className="mt-2 text-2xl font-bold text-gray-900">12</h3>
                  <p className="mt-1 text-xs text-blue-600">
                    Awaiting resolution
                  </p>
                </div>
              </div>

              <AnalyticsChart />
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="mb-5">
                <h2 className="text-lg font-bold text-gray-900">
                  Recent Activity
                </h2>
                <p className="text-sm text-gray-500">
                  Latest actions across the system
                </p>
              </div>

              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition"
                  >
                    <div className="mt-0.5">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        {activity.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    Recent Users
                  </h2>
                  <p className="text-sm text-gray-500">
                    Newly active users and rider accounts
                  </p>
                </div>
                <button className="text-sm font-semibold text-primary hover:underline">
                  View All
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-100 text-left text-xs uppercase tracking-wider text-gray-500">
                      <th className="py-3 pr-4">Name</th>
                      <th className="py-3 pr-4">Email</th>
                      <th className="py-3 pr-4">Role</th>
                      <th className="py-3 pr-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentUsers.map((user, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-50 last:border-0"
                      >
                        <td className="py-4 pr-4 font-medium text-gray-900">
                          {user.name}
                        </td>
                        <td className="py-4 pr-4 text-gray-600">
                          {user.email}
                        </td>
                        <td className="py-4 pr-4 capitalize text-gray-700">
                          {user.role}
                        </td>
                        <td className="py-4 pr-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusBadge(
                              user.status
                            )}`}
                          >
                            {user.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="mb-5">
                <h2 className="text-lg font-bold text-gray-900">
                  Quick Actions
                </h2>
                <p className="text-sm text-gray-500">
                  Manage important tasks quickly
                </p>
              </div>

              <div className="space-y-4">
                {quickActions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={action.title}
                      className="w-full text-left p-4 rounded-2xl border border-gray-100 hover:border-primary/30 hover:bg-gray-50 transition"
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-xl bg-primary/10 text-primary">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-gray-900">
                            {action.title}
                          </h3>
                          <p className="text-xs text-gray-500 mt-1">
                            {action.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </RoleGuard>
  );
}