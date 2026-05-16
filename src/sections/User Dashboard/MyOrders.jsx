"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import { FaSearch, FaFilter, FaSpinner, FaBoxOpen, FaEye } from "react-icons/fa";
import Link from "next/link";

const STATUS_CONFIG = {
  pending:         { label: "Pending",          bg: "bg-amber-100",   text: "text-amber-800"   },
  accepted:        { label: "Accepted",          bg: "bg-blue-100",    text: "text-blue-800"    },
  in_transit:      { label: "In Transit",        bg: "bg-purple-100",  text: "text-purple-800"  },
  out_for_delivery:{ label: "Out for Delivery",  bg: "bg-orange-100",  text: "text-orange-800"  },
  delivered:       { label: "Delivered",         bg: "bg-green-100",   text: "text-green-800"   },
  cancelled:       { label: "Cancelled",         bg: "bg-red-100",     text: "text-red-800"     },
  returned:        { label: "Returned",          bg: "bg-gray-100",    text: "text-gray-600"    },
};

export default function MyOrders() {
  const { data: session } = useSession();
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    if (!session?.accessToken) return;
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/parcels/my-bookings`,
          { headers: { Authorization: `Bearer ${session.accessToken}` } }
        );
        if (res.data.success) {
          setParcels(res.data.parcels);
        }
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [session]);

  const filteredParcels = parcels.filter(p => {
    const matchesSearch = p.trackingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        p.receiver?.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-primary mb-1">Shipment History</p>
            <h1 className="text-2xl font-extrabold text-secondary">My Orders</h1>
            <p className="text-sm text-gray-400 mt-1">Manage and track all your delivery bookings.</p>
          </div>
          <Link
            href="/dashboard/book-parcel"
            className="bg-secondary text-white font-bold text-sm px-6 py-3 rounded-2xl shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span>+</span> Book New Parcel
          </Link>
        </div>

        {/* Filters Bar */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <input
              type="text"
              placeholder="Search by Tracking ID or Receiver Name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-100 rounded-xl text-sm text-secondary font-bold focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all"
            />
          </div>
          <div className="flex items-center gap-2 bg-white border border-gray-100 rounded-xl px-4 py-3">
            <FaFilter className="text-primary text-xs" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent text-xs font-black uppercase tracking-widest text-secondary outline-none cursor-pointer"
            >
              <option value="all">All Status</option>
              {Object.keys(STATUS_CONFIG).map(status => (
                <option key={status} value={status}>{STATUS_CONFIG[status].label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Orders Table Container */}
        <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <FaSpinner className="animate-spin text-3xl text-primary" />
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Loading your parcels…</p>
            </div>
          ) : filteredParcels.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-4xl">📦</div>
              <h3 className="text-xl font-extrabold text-secondary mb-1">No orders found</h3>
              <p className="text-gray-400 text-sm max-w-xs mx-auto">
                {searchTerm || statusFilter !== "all" 
                  ? "We couldn't find any orders matching your current filters."
                  : "You haven't booked any parcels yet. Start shipping today!"}
              </p>
              {(searchTerm || statusFilter !== "all") && (
                <button 
                  onClick={() => { setSearchTerm(""); setStatusFilter("all"); }}
                  className="mt-4 text-primary font-bold text-sm hover:underline"
                >
                  Clear all filters
                </button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-100">
                    {["Tracking ID", "Receiver", "Type & Weight", "Total Cost", "Status", "Booked On"].map(h => (
                      <th key={h} className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredParcels.map((parcel) => {
                    const cfg = STATUS_CONFIG[parcel.status] || STATUS_CONFIG.pending;
                    return (
                      <tr key={parcel._id} className="hover:bg-gray-50/50 transition-colors group">
                        <td className="px-6 py-5">
                          <span className="font-black text-secondary text-xs bg-primary/10 px-3 py-1.5 rounded-lg border border-primary/5">
                            {parcel.trackingId}
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <p className="font-bold text-secondary text-sm">{parcel.receiver?.name}</p>
                          <p className="text-[10px] text-gray-500 mt-0.5">{parcel.receiver?.phone}</p>
                        </td>
                        <td className="px-6 py-5">
                          <p className="text-xs font-bold text-gray-700">{parcel.type}</p>
                          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-black mt-0.5">{parcel.weight} KG</p>
                        </td>
                        <td className="px-6 py-5">
                          <p className="text-sm font-black text-secondary">৳{parcel.deliveryCharge}</p>
                        </td>
                        <td className="px-6 py-5">
                          <span className={`${cfg.bg} ${cfg.text} px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm`}>
                            {cfg.label}
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                            {new Date(parcel.createdAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric"
                            })}
                          </p>
                        </td>

                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-secondary p-6 rounded-3xl">
          <div className="flex items-center gap-3">
            <span className="text-2xl">💡</span>
            <p className="text-white/60 text-xs font-medium">
              Want to see exactly where your parcel is? Click on <span className="text-primary font-bold">View details</span> to see the full tracking history.
            </p>
          </div>
          <Link href="/dashboard/track-order" className="text-xs font-black text-primary uppercase tracking-[0.2em] hover:underline whitespace-nowrap">
            Open Tracker →
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
