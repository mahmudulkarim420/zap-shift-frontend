"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import { Package, Truck, CheckCircle2, Clock3, Search, Filter, Eye, Loader2, RefreshCw, Trash2, UserPlus } from "lucide-react";
import Swal from "sweetalert2";

export default function AllParcels() {
  const { data: session } = useSession();
  const [parcels, setParcels] = useState([]);
  const [riders, setRiders] = useState([]);
  const [stats, setStats] = useState({
    totalParcels: 0,
    activeDeliveries: 0,
    completedDeliveries: 0,
    pendingParcels: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
  const headers = { Authorization: `Bearer ${session?.accessToken}` };

  const fetchData = useCallback(async () => {
    if (!session?.accessToken) return;
    try {
      setLoading(true);
      const [parcelsRes, statsRes, ridersRes] = await Promise.all([
        axios.get(`${BASE}/admin/parcels`, { headers }),
        axios.get(`${BASE}/admin/dashboard-stats`, { headers }),
        axios.get(`${BASE}/admin/riders`, { headers })
      ]);

      if (parcelsRes.data.success) {
        setParcels(parcelsRes.data.data);
      }

      if (statsRes.data.success) {
        const s = statsRes.data.data;
        setStats({
          totalParcels: (s.activeDeliveries || 0) + (s.completedDeliveries || 0),
          activeDeliveries: s.activeDeliveries || 0,
          completedDeliveries: s.completedDeliveries || 0,
          pendingParcels: (Array.isArray(parcelsRes.data.data) ? parcelsRes.data.data : []).filter(p => p.status === 'accepted').length
        });
      }

      if (ridersRes.data.success) {
        const ridersData = ridersRes.data.data;
        setRiders(ridersData);
        console.log("ADMIN_FETCHED_RIDERS:", ridersData);
      }
    } catch (err) {
      setError("Failed to fetch data. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [session?.accessToken, BASE]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const getStatusBadge = (status) => {
    switch ((status || "pending").toLowerCase()) {
      case "pending":
        return "bg-amber-100 text-amber-700 border border-amber-200";
      case "accepted":
        return "bg-blue-100 text-blue-700 border border-blue-200";
      case "awaiting_payment":
        return "bg-orange-100 text-orange-700 border border-orange-200";
      case "paid":
        return "bg-emerald-100 text-emerald-700 border border-emerald-200";
      case "picked_up":
        return "bg-indigo-100 text-indigo-700 border border-indigo-200";
      case "delivered":
        return "bg-green-100 text-green-700 border border-green-200";
      case "cancelled":
      case "returned":
        return "bg-red-100 text-red-700 border border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border border-gray-200";
    }
  };

  const handleApproveMatch = async (parcelId) => {
    try {
      const res = await axios.put(`${BASE}/admin/parcels/approve-match/${parcelId}`, {}, { headers });
      if (res.data.success) {
        Swal.fire({ title: "Success", text: "Match approved!", icon: "success", toast: true, position: 'top-end', showConfirmButton: false, timer: 3000 });
        setParcels(prev => prev.map(p => p._id === parcelId ? { ...p, status: 'awaiting_payment' } : p));
      }
    } catch (err) {
      Swal.fire("Error", "Failed to approve match", "error");
    }
  };

  const handleForceAssign = async (parcelId, riderId) => {
    if (!riderId) return;
    try {
      const res = await axios.put(`${BASE}/admin/parcels/assign/${parcelId}`, { riderId }, { headers });
      if (res.data.success) {
        Swal.fire({ title: "Assigned", text: "Rider force-assigned successfully!", icon: "success", toast: true, position: 'top-end', showConfirmButton: false, timer: 3000 });
        setParcels(prev => prev.map(p => p._id === parcelId ? { ...p, status: 'accepted', assignedRider: riders.find(r => r._id === riderId) } : p));
      }
    } catch (err) {
      Swal.fire("Error", "Failed to assign rider", "error");
    }
  };

  const handleForceCancel = async (parcelId) => {
    const result = await Swal.fire({
      title: "Terminate Parcel?",
      text: "This will instantly cancel this order. This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Yes, Terminate",
      cancelButtonText: "Keep it"
    });

    if (result.isConfirmed) {
      try {
        const res = await axios.put(`${BASE}/admin/parcels/force-cancel/${parcelId}`, {}, { headers });
        if (res.data.success) {
          Swal.fire("Cancelled", "Parcel has been terminated.", "success");
          setParcels(prev => prev.map(p => p._id === parcelId ? { ...p, status: 'cancelled' } : p));
        }
      } catch (err) {
        Swal.fire("Error", "Failed to cancel parcel", "error");
      }
    }
  };

  const parcelStats = [
    { title: "Active Deliveries", value: stats.activeDeliveries, subtitle: "On the way", icon: Truck, cardStyle: "bg-orange-50", iconStyle: "bg-orange-100 text-orange-700", textStyle: "text-orange-950" },
    { title: "Delivered", value: stats.completedDeliveries, subtitle: "Completed", icon: CheckCircle2, cardStyle: "bg-emerald-50", iconStyle: "bg-emerald-100 text-emerald-700", textStyle: "text-emerald-950" },
    { title: "Awaiting Action", value: stats.pendingParcels, subtitle: "Ready for match", icon: Clock3, cardStyle: "bg-violet-50", iconStyle: "bg-violet-100 text-violet-700", textStyle: "text-violet-950" },
  ];

  return (
    <DashboardLayout roleName="Admin">
      <div className="space-y-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">Enterprise Parcel Audit</h1>
            <p className="mt-1 text-sm text-gray-500">Global super-management of all shipments across the network.</p>
          </div>
          <button onClick={fetchData} className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-secondary text-white text-xs font-black uppercase tracking-widest shadow-lg hover:brightness-110 active:scale-95 transition-all">
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh Data
          </button>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {parcelStats.map((item) => (
            <div key={item.title} className={`rounded-[2rem] border border-gray-100 p-6 shadow-sm ${item.cardStyle}`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">{item.title}</p>
                  <h3 className={`mt-3 text-3xl font-black ${item.textStyle}`}>{loading ? "..." : item.value}</h3>
                </div>
                <div className={`rounded-2xl p-4 ${item.iconStyle}`}>
                  <item.icon className="h-5 w-5" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-[2.5rem] border border-gray-100 bg-white p-6 lg:p-10 shadow-sm relative overflow-hidden">
          <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
             <h2 className="text-xl font-black text-gray-900 flex items-center gap-3">
                <Package className="text-primary w-6 h-6" />
                Shipment Records
             </h2>
             <div className="relative group w-full lg:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 group-focus-within:text-primary transition-colors" />
                <input type="text" placeholder="Search tracking ID or sender..." className="w-full pl-12 pr-4 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl text-xs font-bold outline-none focus:ring-4 focus:ring-primary/10 transition-all" />
             </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 border-b border-gray-100">
                  <th className="px-6 py-5">Parcel Details</th>
                  <th className="px-6 py-5">Parties</th>
                  <th className="px-6 py-5 text-center">Assign Rider</th>
                  <th className="px-6 py-5 text-center">Lifecycle</th>
                  <th className="px-6 py-5 text-right">Super-Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-50">
                {loading ? (
                  [1, 2, 3].map(i => <tr key={i} className="animate-pulse"><td colSpan="5" className="px-6 py-8"><div className="h-12 bg-gray-50 rounded-2xl" /></td></tr>)
                ) : parcels.map((parcel) => (
                  <tr key={parcel._id} className="group hover:bg-gray-50/50 transition-all duration-300">
                    <td className="px-6 py-6">
                      <span className="font-black text-xs text-secondary bg-primary/10 px-3 py-1.5 rounded-lg border border-primary/5 uppercase tracking-tighter">#{parcel._id.slice(-8)}</span>
                      <div className="mt-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">{parcel.type}</div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="space-y-1">
                        <p className="text-xs font-black text-secondary">S: {parcel.sender?.name || "Guest"}</p>
                        <p className="text-xs font-black text-secondary">R: {parcel.receiver?.name}</p>
                      </div>
                    </td>
                    <td className="px-6 py-6 text-center">
                      {['pending', 'accepted', 'awaiting_payment'].includes(parcel.status) ? (
                        <div className="relative inline-block w-full max-w-[180px]">
                           <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 w-3 h-3 z-10" />
                           <select 
                            defaultValue={parcel.assignedRider?._id || ""}
                            onChange={(e) => handleForceAssign(parcel._id, e.target.value)}
                            className="w-full pl-8 pr-4 py-2 bg-slate-800 text-white border border-white/20 rounded-xl text-[10px] font-black uppercase tracking-widest outline-none cursor-pointer hover:bg-slate-700 transition-all focus:ring-2 focus:ring-lime-400 appearance-none"
                           >
                             <option value="">{riders.length > 0 ? "Select Rider" : "Loading riders..."}</option>
                             {riders.map(r => <option key={r._id} value={r._id}>{r.name}</option>)}
                           </select>
                        </div>
                      ) : parcel.assignedRider ? (
                        <div className="flex flex-col items-center gap-1">
                           <span className="text-[10px] font-black text-secondary uppercase tracking-widest">{parcel.assignedRider?.name}</span>
                           <span className="text-[8px] font-bold text-gray-400">ID: {parcel.assignedRider?._id?.slice(-6)}</span>
                        </div>
                      ) : <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest italic">Unassigned</span>}
                    </td>
                    <td className="px-6 py-6 text-center">
                      <span className={`inline-flex px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm ${getStatusBadge(parcel.status)}`}>
                        {parcel.status.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-6 text-right">
                       <div className="flex items-center justify-end gap-3">
                          {parcel.status === 'accepted' && (
                            <button onClick={() => handleApproveMatch(parcel._id)} className="bg-[#C8FF65] text-secondary p-2.5 rounded-xl shadow-lg shadow-[#C8FF65]/20 hover:scale-110 active:scale-95 transition-all" title="Approve Match">
                               <CheckCircle2 className="w-4 h-4" />
                            </button>
                          )}
                          {!['cancelled', 'delivered'].includes(parcel.status) && (
                            <button onClick={() => handleForceCancel(parcel._id)} className="bg-red-50 text-red-500 p-2.5 rounded-xl border border-red-100 hover:bg-red-500 hover:text-white transition-all shadow-sm" title="Force Terminate">
                               <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                       </div>
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
