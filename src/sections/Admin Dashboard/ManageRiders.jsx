"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import RoleGuard from "@/components/RoleGuard";
import {
  Bike,
  UserCheck,
  Clock3,
  ShieldAlert,
  Search,
  Eye,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Loader2,
  MapPin,
  FileText
} from "lucide-react";
import Swal from "sweetalert2";

export default function ManageRiders() {
  const { data: session } = useSession();
  const [riders, setRiders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalRiders: 0,
    activeRiders: 0,
    pendingReview: 0,
    suspended: 0
  });
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = useCallback(async () => {
    if (!session?.accessToken) return;
    const BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
    const headers = { Authorization: `Bearer ${session.accessToken}` };

    try {
      setLoading(true);
      const res = await axios.get(`${BASE}/admin/riders`, { headers });
      if (res.data.success) {
        const data = res.data.data || [];
        setRiders(data);
        
        setStats({
          totalRiders: data.length,
          activeRiders: data.filter(r => r.status === 'active').length,
          pendingReview: data.filter(r => r.status === 'pending').length,
          suspended: data.filter(r => r.status === 'suspended').length
        });
      }
    } catch (err) {
      console.error("Failed to fetch riders:", err);
      Swal.fire("Error", "Could not load rider fleet data.", "error");
    } finally {
      setLoading(false);
    }
  }, [session]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleAction = async (id, newStatus, riderName, actionType) => {
    const config = {
      approve: { title: "Approve Rider?", text: `Grant ${riderName} access to the fleet?`, icon: "question", color: "#10b981", btn: "Yes, Approve" },
      reject: { title: "Reject Application?", text: `This will suspend ${riderName}'s application.`, icon: "warning", color: "#ef4444", btn: "Yes, Reject" },
      suspend: { title: "Suspend Rider?", text: `Restrict ${riderName} from accepting new deliveries?`, icon: "warning", color: "#f59e0b", btn: "Yes, Suspend" },
      activate: { title: "Unsuspend Rider?", text: `Restore delivery access for ${riderName}?`, icon: "info", color: "#10b981", btn: "Yes, Activate" }
    }[actionType];

    const result = await Swal.fire({
      title: config.title,
      text: config.text,
      icon: config.icon,
      showCancelButton: true,
      confirmButtonColor: config.color,
      confirmButtonText: config.btn
    });

    if (result.isConfirmed) {
      try {
        const headers = { Authorization: `Bearer ${session.accessToken}` };
        const BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
        
        const res = await axios.put(`${BASE}/admin/users/${id}/role-status`, { status: newStatus }, { headers });
        
        if (res.data.success) {
          Swal.fire({
            title: "Success!",
            text: `Rider ${riderName} is now ${newStatus}.`,
            icon: "success",
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
          });
          fetchData();
        }
      } catch (err) {
        Swal.fire("Error", err.response?.data?.message || "Action failed.", "error");
      }
    }
  };

  const filteredRiders = riders.filter(r => 
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (r.phone && r.phone.includes(searchTerm))
  );

  return (
    <RoleGuard allowedRoles={['admin']}>
      <DashboardLayout roleName="Admin">
        <div className="space-y-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">Fleet Management</h1>
              <p className="mt-1 text-sm md:text-base text-gray-500">
                Monitor logistics partners, approve applications, and track active zones.
              </p>
            </div>

            <button 
              onClick={fetchData}
              className="w-fit flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Sync Fleet
            </button>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {[
              { title: "Total Fleet", value: stats.totalRiders, icon: Bike, color: "orange" },
              { title: "On Duty", value: stats.activeRiders, icon: UserCheck, color: "emerald" },
              { title: "Applications", value: stats.pendingReview, icon: Clock3, color: "amber" },
              { title: "Restricted", value: stats.suspended, icon: ShieldAlert, color: "red" }
            ].map((item) => (
              <div key={item.title} className={`rounded-[2rem] border border-${item.color}-100 bg-${item.color}-50/50 p-6 shadow-sm backdrop-blur-sm`}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className={`text-[10px] font-black uppercase tracking-widest text-${item.color}-700`}>{item.title}</p>
                    <h3 className={`mt-3 text-3xl font-black text-${item.color}-950`}>
                      {loading ? <div className={`h-8 w-12 bg-${item.color}-200 animate-pulse rounded-lg`} /> : item.value}
                    </h3>
                  </div>
                  <div className={`rounded-2xl bg-${item.color}-100 p-3 text-${item.color}-700 shadow-inner`}>
                    <item.icon className="h-5 w-5" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-[2.5rem] border border-gray-100 bg-white/70 backdrop-blur-xl p-6 lg:p-10 shadow-2xl shadow-gray-200/40">
            <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-xl font-black text-gray-900">Rider Directory</h2>
                <p className="mt-1 text-sm text-gray-500 font-medium">Verify credentials and manage operational availability.</p>
              </div>

              <div className="flex items-center gap-3 px-6 py-3 bg-gray-50/80 border border-gray-100 rounded-2xl w-full lg:w-96 shadow-inner">
                <Search className="h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Find by name, email, or NID..."
                  className="bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="overflow-x-auto rounded-[2rem] border border-gray-50 bg-white/50">
              <table className="min-w-full">
                <thead className="bg-gray-50/50 border-b border-gray-100">
                  <tr className="text-left text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                    <th className="px-8 py-5 text-left">Rider Detail</th>
                    <th className="px-8 py-5 text-left">Credentials</th>
                    <th className="px-8 py-5 text-left">Hub / Zone</th>
                    <th className="px-8 py-5 text-left">Status</th>
                    <th className="px-8 py-5 text-center">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-50 text-sm">
                  {loading ? (
                    [...Array(4)].map((_, i) => (
                      <tr key={i} className="animate-pulse">
                        <td className="px-8 py-6"><div className="h-12 bg-gray-100 rounded-2xl w-48" /></td>
                        <td className="px-8 py-6"><div className="h-12 bg-gray-100 rounded-2xl w-32" /></td>
                        <td className="px-8 py-6"><div className="h-12 bg-gray-100 rounded-2xl w-40" /></td>
                        <td className="px-8 py-6"><div className="h-8 bg-gray-100 rounded-full w-20" /></td>
                        <td className="px-8 py-6"><div className="h-10 bg-gray-100 rounded-xl w-32 mx-auto" /></td>
                      </tr>
                    ))
                  ) : filteredRiders.length > 0 ? (
                    filteredRiders.map((rider) => (
                      <tr key={rider._id} className="transition-colors hover:bg-gray-50/50 group">
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                            <div className="w-11 h-11 rounded-2xl bg-secondary flex items-center justify-center text-primary font-black shadow-lg shadow-secondary/10 overflow-hidden">
                              {rider.image ? <img src={rider.image} className="w-full h-full object-cover" /> : rider.name.charAt(0)}
                            </div>
                            <div className="flex flex-col">
                              <span className="font-bold text-gray-900 group-hover:text-primary transition-colors">{rider.name}</span>
                              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-widest">{rider.phone || 'No Phone'}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2 text-gray-600 font-medium">
                              <FileText className="w-3 h-3 text-gray-400" />
                              <span>{rider.nid || 'N/A'}</span>
                            </div>
                            <span className="text-[10px] text-gray-400 font-bold">{rider.email}</span>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2 text-gray-900 font-bold">
                              <MapPin className="w-3 h-3 text-primary" />
                              <span>{rider.warehouseId?.name || 'Central Hub'}</span>
                            </div>
                            <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{rider.warehouseId?.area || 'Default Zone'}</span>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all
                            ${rider.status === 'active' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 
                              rider.status === 'pending' ? 'bg-amber-50 text-amber-700 border-amber-100 animate-pulse' : 
                              'bg-red-50 text-red-700 border-red-100'}`}>
                            {rider.status}
                          </span>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex items-center justify-center gap-2">
                            {rider.status === 'pending' && (
                              <>
                                <button 
                                  onClick={() => handleAction(rider._id, 'active', rider.name, 'approve')}
                                  className="p-2 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-500 hover:text-white transition-all shadow-sm"
                                  title="Approve Rider"
                                >
                                  <CheckCircle2 className="w-5 h-5" />
                                </button>
                                <button 
                                  onClick={() => handleAction(rider._id, 'suspended', rider.name, 'reject')}
                                  className="p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                                  title="Reject Application"
                                >
                                  <XCircle className="w-5 h-5" />
                                </button>
                              </>
                            )}
                            {rider.status === 'active' && (
                              <button 
                                onClick={() => handleAction(rider._id, 'suspended', rider.name, 'suspend')}
                                className="px-4 py-2 rounded-xl bg-amber-50 text-amber-700 text-[10px] font-black uppercase tracking-widest hover:bg-amber-500 hover:text-white transition-all shadow-sm"
                              >
                                Suspend
                              </button>
                            )}
                            {rider.status === 'suspended' && (
                              <button 
                                onClick={() => handleAction(rider._id, 'active', rider.name, 'activate')}
                                className="px-4 py-2 rounded-xl bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all shadow-sm"
                              >
                                Unsuspend
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan="5" className="px-8 py-12 text-center text-gray-400 font-bold italic">No riders match your current search.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </RoleGuard>
  );
}
