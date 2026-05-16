'use client';

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import AnalyticsChart from "@/components/Dashboard/AnalyticsChart";
import Link from "next/link";
import {
  Users, Bike, Package, TrendingUp, Clock3,
  ShieldCheck, AlertTriangle, CheckCircle2,
  UserPlus, Settings, RefreshCw
} from "lucide-react";

const StatSkeleton = () => (
  <div className="rounded-2xl border p-5 shadow-sm bg-gray-50 border-gray-100 animate-pulse">
    <div className="flex items-start justify-between">
      <div className="space-y-3 flex-1">
        <div className="h-3 bg-gray-200 rounded w-24" />
        <div className="h-8 bg-gray-200 rounded w-16" />
        <div className="h-2 bg-gray-100 rounded w-20" />
      </div>
      <div className="w-11 h-11 bg-gray-200 rounded-xl" />
    </div>
  </div>
);

const SummaryCardSkeleton = () => (
  <div className="rounded-2xl bg-gray-50 p-5 border border-gray-100 animate-pulse space-y-3">
    <div className="h-3 bg-gray-200 rounded w-28" />
    <div className="h-7 bg-gray-200 rounded w-12" />
    <div className="h-2 bg-gray-100 rounded w-24" />
  </div>
);

const getStatusBadge = (status) => {
  switch (status) {
    case "active":    return "bg-emerald-100 text-emerald-700";
    case "pending":   return "bg-amber-100 text-amber-700";
    case "suspended": return "bg-red-100 text-red-700";
    default:          return "bg-gray-100 text-gray-700";
  }
};

const getActivityIcon = (type) => {
  switch (type) {
    case "success": return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
    case "warning": return <AlertTriangle className="w-4 h-4 text-amber-600" />;
    case "pending": return <Clock3 className="w-4 h-4 text-orange-600" />;
    default:        return <ShieldCheck className="w-4 h-4 text-blue-600" />;
  }
};

const recentActivities = [
  { title: "New rider registration submitted",   time: "5 minutes ago",  type: "pending"  },
  { title: "User status updated successfully",   time: "12 minutes ago", type: "success"  },
  { title: "Delivery request assigned to rider", time: "22 minutes ago", type: "info"     },
  { title: "Suspicious login attempt detected",  time: "1 hour ago",     type: "warning"  },
];

export default function AdminDashboard() {
  const { data: session } = useSession();
  const [stats, setStats] = useState(null);
  const [recentUsers, setRecentUsers] = useState([]);
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);

  const headers = { Authorization: `Bearer ${session?.accessToken}` };
  const BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

  const fetchStats = useCallback(async () => {
    if (!session?.accessToken) return;
    try {
      setLoadingStats(true);
      const res = await axios.get(`${BASE}/admin/dashboard-stats`, { headers });
      if (res.data.success) setStats(res.data.data);
    } catch (err) {
      console.error("Failed to fetch dashboard stats:", err);
    } finally {
      setLoadingStats(false);
    }
  }, [session?.accessToken]);

  const fetchRecentUsers = useCallback(async () => {
    if (!session?.accessToken) return;
    try {
      setLoadingUsers(true);
      const res = await axios.get(`${BASE}/admin/users`, { headers });
      if (res.data.success) {
        const data = Array.isArray(res.data.data) ? res.data.data : [];
        setRecentUsers(data.slice(0, 5));
      }
    } catch (err) {
      console.error("Failed to fetch users:", err);
    } finally {
      setLoadingUsers(false);
    }
  }, [session?.accessToken]);

  useEffect(() => {
    fetchStats();
    fetchRecentUsers();
  }, [fetchStats, fetchRecentUsers]);

  const statCards = [
    {
      title: "Total Users",
      value: stats?.totalUsers ?? "—",
      change: "+Live",
      icon: Users,
      cardStyle: "bg-blue-50 border-blue-100",
      iconStyle: "bg-blue-100 text-blue-700",
      textStyle: "text-blue-900",
    },
    {
      title: "Active Riders",
      value: stats?.totalRiders ?? "—",
      change: "+Live",
      icon: Bike,
      cardStyle: "bg-orange-50 border-orange-100",
      iconStyle: "bg-orange-100 text-orange-700",
      textStyle: "text-orange-900",
    },
    {
      title: "Active Deliveries",
      value: stats?.activeDeliveries ?? "—",
      change: "+Live",
      icon: Package,
      cardStyle: "bg-emerald-50 border-emerald-100",
      iconStyle: "bg-emerald-100 text-emerald-700",
      textStyle: "text-emerald-900",
    },
    {
      title: "Pending Approvals",
      value: stats?.pendingApprovals ?? "—",
      change: stats?.pendingApprovals > 0 ? "Needs attention" : "All clear",
      icon: TrendingUp,
      cardStyle: "bg-violet-50 border-violet-100",
      iconStyle: "bg-violet-100 text-violet-700",
      textStyle: "text-violet-900",
    },
  ];

  return (
    <DashboardLayout roleName="Admin">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">Dashboard Overview</h1>
            <p className="text-sm md:text-base text-gray-500 mt-1">
              Welcome back. Here is a quick summary of your platform activity.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => { fetchStats(); fetchRecentUsers(); }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
            >
              <RefreshCw className={`w-4 h-4 ${(loadingStats || loadingUsers) ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <Link href="/dashboard/admin/riders" className="px-4 py-2 rounded-xl bg-primary text-black text-sm font-semibold hover:opacity-90 transition">
              Manage Riders
            </Link>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {loadingStats
            ? [1, 2, 3, 4].map(i => <StatSkeleton key={i} />)
            : statCards.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className={`rounded-2xl border p-5 shadow-sm ${item.cardStyle}`}>
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{item.title}</p>
                        <h3 className={`mt-2 text-3xl font-extrabold ${item.textStyle}`}>{item.value}</h3>
                        <p className="mt-2 text-xs font-semibold text-emerald-600">{item.change}</p>
                      </div>
                      <div className={`p-3 rounded-xl ${item.iconStyle}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>

        {/* Platform Summary + Activity */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Platform Summary</h2>
                <p className="text-sm text-gray-500">Current operational snapshot of your system</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold">
                Live Overview
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {loadingStats ? (
                [1, 2, 3].map(i => <SummaryCardSkeleton key={i} />)
              ) : (
                <>
                  <div className="rounded-2xl bg-gray-50 p-5 border border-gray-100">
                    <p className="text-sm text-gray-500">Pending Approvals</p>
                    <h3 className="mt-2 text-2xl font-bold text-gray-900">{stats?.pendingApprovals ?? "—"}</h3>
                    <p className="mt-1 text-xs text-amber-600">
                      {stats?.pendingApprovals > 0 ? "Needs admin attention" : "No pending riders"}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-gray-50 p-5 border border-gray-100">
                    <p className="text-sm text-gray-500">Completed Deliveries</p>
                    <h3 className="mt-2 text-2xl font-bold text-gray-900">{stats?.completedDeliveries ?? "—"}</h3>
                    <p className="mt-1 text-xs text-emerald-600">Strong delivery performance</p>
                  </div>
                  <div className="rounded-2xl bg-gray-50 p-5 border border-gray-100">
                    <p className="text-sm text-gray-500">Active Deliveries</p>
                    <h3 className="mt-2 text-2xl font-bold text-gray-900">{stats?.activeDeliveries ?? "—"}</h3>
                    <p className="mt-1 text-xs text-blue-600">Currently in progress</p>
                  </div>
                </>
              )}
            </div>

            <AnalyticsChart />
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="mb-5">
              <h2 className="text-lg font-bold text-gray-900">Recent Activity</h2>
              <p className="text-sm text-gray-500">Latest actions across the system</p>
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition">
                  <div className="mt-0.5">{getActivityIcon(activity.type)}</div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{activity.title}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Users + Quick Actions */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Recent Users</h2>
                <p className="text-sm text-gray-500">Newly active users and rider accounts</p>
              </div>
              <Link href="/dashboard/admin/users" className="text-sm font-semibold text-primary hover:underline">
                View All
              </Link>
            </div>

            <div className="overflow-x-auto">
              {loadingUsers ? (
                <div className="space-y-3 animate-pulse">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-10 bg-gray-100 rounded-xl" />
                  ))}
                </div>
              ) : (
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
                    {recentUsers.map((user) => (
                      <tr key={user._id} className="border-b border-gray-50 last:border-0">
                        <td className="py-4 pr-4 font-medium text-gray-900">{user.name}</td>
                        <td className="py-4 pr-4 text-gray-600 text-sm">{user.email}</td>
                        <td className="py-4 pr-4 capitalize text-gray-700 text-sm">{user.role}</td>
                        <td className="py-4 pr-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusBadge(user.status)}`}>
                            {user.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="mb-5">
              <h2 className="text-lg font-bold text-gray-900">Quick Actions</h2>
              <p className="text-sm text-gray-500">Manage important tasks quickly</p>
            </div>
            <div className="space-y-4">
              {[
                { title: "Pending Riders",   desc: `${stats?.pendingApprovals ?? "—"} awaiting approval`,  icon: ShieldCheck, href: "/dashboard/admin/riders" },
                { title: "All Users",        desc: "Manage user accounts & roles",                         icon: UserPlus,    href: "/dashboard/admin/users" },
                { title: "All Parcels",      desc: "View and manage delivery orders",                      icon: Package,     href: "/dashboard/admin/parcels" },
              ].map((action) => {
                const Icon = action.icon;
                return (
                  <Link key={action.title} href={action.href}
                    className="block w-full text-left p-4 rounded-2xl border border-gray-100 hover:border-primary/30 hover:bg-gray-50 transition">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-xl bg-primary/10 text-primary">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900">{action.title}</h3>
                        <p className="text-xs text-gray-500 mt-1">{action.desc}</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}