"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import { Package, Truck, CheckCircle2, Clock3, Search, Filter, Eye, Loader2, RefreshCw } from "lucide-react";

export default function AllParcels() {
  const { data: session } = useSession();
  const [parcels, setParcels] = useState([]);
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
      const [parcelsRes, statsRes] = await Promise.all([
        axios.get(`${BASE}/admin/parcels`, { headers }),
        axios.get(`${BASE}/admin/dashboard-stats`, { headers })
      ]);

      if (parcelsRes.data.success) {
        setParcels(parcelsRes.data.data);
      }

      if (statsRes.data.success) {
        const s = statsRes.data.data;
        setStats({
          totalParcels: (s.activeDeliveries || 0) + (s.completedDeliveries || 0), // Approximation for demo
          activeDeliveries: s.activeDeliveries || 0,
          completedDeliveries: s.completedDeliveries || 0,
          pendingParcels: (Array.isArray(parcelsRes.data.data) ? parcelsRes.data.data : []).filter(p => p.status === 'pending').length
        });
      }
    } catch (err) {
      setError("Failed to fetch parcels. Please try again.");
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
      case "picked_up":
      case "in_transit":
      case "out_for_delivery":
        return "bg-blue-100 text-blue-700 border border-blue-200";
      case "delivered":
        return "bg-emerald-100 text-emerald-700 border border-emerald-200";
      case "cancelled":
      case "returned":
        return "bg-red-100 text-red-700 border border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border border-gray-200";
    }
  };

  const parcelStats = [
    {
      title: "Active Deliveries",
      value: stats.activeDeliveries,
      subtitle: "Currently on the way",
      icon: Truck,
      cardStyle: "bg-orange-50 border-orange-100",
      iconStyle: "bg-orange-100 text-orange-700",
      textStyle: "text-orange-950",
    },
    {
      title: "Delivered",
      value: stats.completedDeliveries,
      subtitle: "Successfully completed",
      icon: CheckCircle2,
      cardStyle: "bg-emerald-50 border-emerald-100",
      iconStyle: "bg-emerald-100 text-emerald-700",
      textStyle: "text-emerald-950",
    },
    {
      title: "Pending Approval",
      value: stats.pendingParcels,
      subtitle: "Waiting for processing",
      icon: Clock3,
      cardStyle: "bg-violet-50 border-violet-100",
      iconStyle: "bg-violet-100 text-violet-700",
      textStyle: "text-violet-950",
    },
  ];

  return (
    <DashboardLayout roleName="Admin">
      <div className="space-y-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">Manage Parcels</h1>
            <p className="mt-1 text-sm md:text-base text-gray-500">
              Global overview of all shipments across the ZapShift network.
            </p>
          </div>
          <button 
            onClick={fetchData}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh List
          </button>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {parcelStats.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className={`rounded-2xl border p-6 shadow-sm ${item.cardStyle}`}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-widest text-gray-600">{item.title}</p>
                    <h3 className={`mt-3 text-3xl font-extrabold ${item.textStyle}`}>
                      {loading ? "..." : item.value}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600">{item.subtitle}</p>
                  </div>
                  <div className={`rounded-xl p-3 ${item.iconStyle}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="rounded-[2.5rem] border border-gray-100 bg-white p-6 lg:p-10 shadow-sm">
          <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Shipment Records</h2>
              <p className="mt-1 text-sm text-gray-500">
                Detailed list of all tracked parcels and their current journey stage.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2">
                <Search className="h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by ID or Name..."
                  className="bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-gray-100">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr className="text-left text-xs font-bold uppercase tracking-widest text-gray-400 border-b border-gray-100">
                  <th className="px-6 py-5">Parcel ID</th>
                  <th className="px-6 py-5">Sender</th>
                  <th className="px-6 py-5">Receiver</th>
                  <th className="px-6 py-5 text-center">Type</th>
                  <th className="px-6 py-5 text-center">Status</th>
                  <th className="px-6 py-5 text-right">Date</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-50 text-sm">
                {loading ? (
                  [1, 2, 3, 4, 5].map(i => (
                    <tr key={i} className="animate-pulse">
                      <td colSpan="6" className="px-6 py-4"><div className="h-8 bg-gray-100 rounded-lg" /></td>
                    </tr>
                  ))
                ) : parcels.length > 0 ? (
                  parcels.map((parcel) => (
                    <tr key={parcel._id} className="transition hover:bg-gray-50/50 group">
                      <td className="px-6 py-4">
                        <span className="font-bold text-gray-900 font-mono text-xs uppercase tracking-tighter">
                          #{parcel._id.slice(-8)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-bold text-gray-800">{parcel.sender?.name || "Guest"}</p>
                        <p className="text-[10px] text-gray-400 font-medium">{parcel.sender?.email || ""}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-bold text-gray-800">{parcel.receiver?.name || "Unnamed"}</p>
                        <p className="text-[10px] text-gray-400 font-medium truncate max-w-[150px]">{parcel.receiver?.address || "No address"}</p>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="px-3 py-1 rounded-lg bg-gray-100 text-[10px] font-black uppercase tracking-widest text-gray-600">
                          {parcel.type || parcel.parcelType || "Standard"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold capitalize ${getStatusBadge(parcel.status)}`}>
                          {parcel.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">
                          {new Date(parcel.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                        </p>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-16 text-center text-gray-400 font-medium italic">
                      No parcels found in the system.
                    </td>
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
