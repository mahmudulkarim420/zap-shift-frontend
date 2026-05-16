"use client";

import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import { Users, UserCheck, Bike, CheckCircle2, XCircle, Search, Filter, Loader2, RefreshCw, ShieldAlert } from "lucide-react";
import Swal from "sweetalert2";

export default function ManageUsers() {
  const { data: session } = useSession();
  const [users, setUsers] = useState([]);
  const [pendingRiders, setPendingRiders] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalRiders: 0,
    activeDeliveries: 0,
    pendingApprovals: 0,
    completedDeliveries: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [approvingId, setApprovingId] = useState(null);

  const BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
  const headers = { Authorization: `Bearer ${session?.accessToken}` };

  const fetchStats = useCallback(async () => {
    try {
      const res = await axios.get(`${BASE}/admin/dashboard-stats`, { headers });
      if (res.data.success) setStats(res.data.data);
    } catch (err) {
      console.error("Stats fetch error:", err);
    }
  }, [session?.accessToken, BASE]);

  const fetchData = useCallback(async () => {
    if (!session?.accessToken) return;
    try {
      setLoading(true);
      const [usersRes, pendingRes] = await Promise.all([
        axios.get(`${BASE}/admin/users`, { headers }),
        axios.get(`${BASE}/admin/riders/pending`, { headers })
      ]);

      if (usersRes.data.success) setUsers(usersRes.data.data || []);
      if (pendingRes.data.success) setPendingRiders(pendingRes.data.data || []);
      
      await fetchStats();
    } catch (err) {
      setError("Failed to fetch user data. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [session?.accessToken, BASE, fetchStats]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleApprove = async (id, name) => {
    try {
      setApprovingId(id);
      const res = await axios.put(`${BASE}/admin/riders/approve/${id}`, {}, { headers });
      
      if (res.data.success) {
        Swal.fire({
          title: "Approved!",
          text: `${name} is now an active rider.`,
          icon: "success",
          confirmButtonColor: "#C8FF65",
        });
        
        // Refresh data
        await fetchData();
      }
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message || "Failed to approve rider", "error");
    } finally {
      setApprovingId(null);
    }
  };

  const getStatusBadge = (status) => {
    switch ((status || "active").toLowerCase()) {
      case "active":
        return "bg-emerald-100 text-emerald-700 border border-emerald-200";
      case "pending":
        return "bg-amber-100 text-amber-700 border border-amber-200";
      case "suspended":
        return "bg-red-100 text-red-700 border border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border border-gray-200";
    }
  };

  return (
    <DashboardLayout roleName="Admin">
      <div className="space-y-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">User Management</h1>
            <p className="mt-1 text-sm md:text-base text-gray-500">
              Control user accounts and process rider recruitment applications.
            </p>
          </div>
          <button 
            onClick={fetchData}
            className="w-fit flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh Data
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-blue-700">Total Users</p>
                <h3 className="mt-3 text-3xl font-extrabold text-blue-950">{stats.totalUsers}</h3>
              </div>
              <div className="rounded-xl bg-blue-100 p-3 text-blue-700">
                <Users className="h-5 w-5" />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-orange-100 bg-orange-50 p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-orange-700">Active Riders</p>
                <h3 className="mt-3 text-3xl font-extrabold text-orange-950">{stats.totalRiders}</h3>
              </div>
              <div className="rounded-xl bg-orange-100 p-3 text-orange-700">
                <Bike className="h-5 w-5" />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-amber-100 bg-amber-50 p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-amber-700">Pending Approvals</p>
                <h3 className="mt-3 text-3xl font-extrabold text-amber-950">{stats.pendingApprovals}</h3>
              </div>
              <div className="rounded-xl bg-amber-100 p-3 text-amber-700">
                <Clock3 className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>

        {/* Pending Riders Section (Requested specifically for All Users view) */}
        {pendingRiders?.length > 0 && (
          <div className="rounded-[2.5rem] border border-amber-200 bg-amber-50/30 p-6 lg:p-8 shadow-sm animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Pending Rider Approvals</h2>
                  <p className="text-sm text-gray-500">Review and approve new recruitment applications.</p>
                </div>
              </div>
              <span className="px-4 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-bold uppercase tracking-wider">
                {pendingRiders?.length} Awaiting
              </span>
            </div>

            <div className="overflow-x-auto rounded-3xl border border-amber-100 bg-white/60 backdrop-blur-sm shadow-inner">
              <table className="min-w-full">
                <thead>
                  <tr className="text-left text-xs font-bold uppercase tracking-widest text-amber-700 border-b border-amber-100">
                    <th className="px-6 py-5">Applicant</th>
                    <th className="px-6 py-5">Contact</th>
                    <th className="px-6 py-5">Preferred Warehouse</th>
                    <th className="px-6 py-5 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-50">
                  {pendingRiders.map((rider) => (
                    <tr key={rider._id} className="transition hover:bg-amber-50/50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center font-bold text-gray-400">
                            {rider.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">{rider.name}</p>
                            <p className="text-xs text-gray-400">Age: {rider.age}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-gray-600">{rider.email}</p>
                        <p className="text-xs text-gray-400">{rider.phone}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-lg bg-white border border-amber-200 text-xs font-bold text-amber-800">
                          {rider.warehouseId?.name || "N/A"} ({rider.warehouseId?.city || "Unknown"})
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button 
                            onClick={() => handleApprove(rider._id, rider.name)}
                            disabled={approvingId === rider._id}
                            className="flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-emerald-500/20 transition hover:scale-105 active:scale-95 disabled:opacity-50"
                          >
                            {approvingId === rider._id ? <Loader2 className="w-3 h-3 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                            Approve
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* All Users Table */}
        <div className="rounded-[2.5rem] border border-gray-100 bg-white p-6 lg:p-10 shadow-sm">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">All Registered Users</h2>
              <p className="mt-1 text-sm text-gray-500">A complete list of users, riders, and administrators.</p>
            </div>
            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search by name/email..." 
                  className="pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-gray-100">
            <table className="min-w-full">
              <thead className="bg-gray-50/50">
                <tr className="text-left text-xs font-bold uppercase tracking-widest text-gray-400 border-b border-gray-100">
                  <th className="px-8 py-5">User Account</th>
                  <th className="px-8 py-5 text-center">Role</th>
                  <th className="px-8 py-5 text-center">Status</th>
                  <th className="px-8 py-5 text-right">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {loading ? (
                  [1, 2, 3, 4, 5].map(i => (
                    <tr key={i} className="animate-pulse">
                      <td colSpan="4" className="px-8 py-6"><div className="h-10 bg-gray-100 rounded-xl" /></td>
                    </tr>
                  ))
                ) : users?.length > 0 ? (
                  users.map((user) => (
                    <tr key={user._id} className="transition hover:bg-gray-50/50 group">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-11 h-11 rounded-2xl bg-secondary flex items-center justify-center text-primary font-black shadow-lg shadow-secondary/10 border border-secondary/10">
                            {user.image ? <img src={user.image} className="w-full h-full object-cover rounded-2xl" /> : user.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-bold text-gray-900 group-hover:text-primary transition-colors">{user.name}</p>
                            <p className="text-xs text-gray-400">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-center">
                        <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                          user.role === 'admin' ? 'bg-violet-100 text-violet-700' :
                          user.role === 'rider' ? 'bg-orange-100 text-orange-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-center">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold capitalize ${getStatusBadge(user.status)}`}>
                          {user.status || "active"}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">
                          {new Date(user.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </p>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-8 py-16 text-center text-gray-400 font-medium italic">No users found in the database.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

// Support Icons
const Clock3 = ({ className }) => <Clock className={className} />;
import { Clock } from "lucide-react";
