"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import { useSession } from "next-auth/react";
import { FaSpinner, FaBox, FaTruck, FaCheckCircle, FaHandSparkles, FaEnvelopeOpenText, FaSearchLocation, FaInbox } from "react-icons/fa";
const STATUS_CONFIG = {
  pending:         { label: "Pending",          bg: "bg-amber-100",   text: "text-amber-800"   },
  accepted:        { label: "Accepted",          bg: "bg-blue-100",    text: "text-blue-800"    },
  in_transit:      { label: "In Transit",        bg: "bg-purple-100",  text: "text-purple-800"  },
  out_for_delivery:{ label: "Out for Delivery",  bg: "bg-orange-100",  text: "text-orange-800"  },
  delivered:       { label: "Delivered",         bg: "bg-green-100",   text: "text-green-800"   },
  cancelled:       { label: "Cancelled",         bg: "bg-red-100",     text: "text-red-800"     },
  returned:        { label: "Returned",          bg: "bg-gray-100",    text: "text-gray-600"    },
};

export default function UserDashboard() {
  const { data: session } = useSession();
  const user = session?.user;

  const [parcels, setParcels]   = useState([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    if (!session?.accessToken) return;
    const fetchParcels = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/parcels/my-bookings`,
          { headers: { Authorization: `Bearer ${session.accessToken}` } }
        );
        if (res.data.success) setParcels(res.data.parcels);
      } catch (err) {
        console.error("Failed to load parcels:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchParcels();
  }, [session]);

  const stats = [
    { label: "Total Booked",     value: parcels.length,                                             icon: <FaBox />, color: "purple" },
    { label: "Active Deliveries",value: parcels.filter(p => !["delivered","cancelled","returned"].includes(p.status)).length, icon: <FaTruck />, color: "blue"   },
    { label: "Delivered",        value: parcels.filter(p => p.status === "delivered").length,        icon: <FaCheckCircle />, color: "green"  },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">

        {/* Welcome Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-primary mb-1">My Dashboard</p>
            <h1 className="text-2xl font-extrabold text-secondary flex items-center gap-2">
              Welcome back, {user?.name?.split(" ")[0] || "there"} <FaHandSparkles className="text-amber-500" />
            </h1>
            <p className="text-sm text-gray-400 mt-1">Track your parcels and manage shipments from here.</p>
          </div>
          <Link
            href="/dashboard/book-parcel"
            className="flex items-center gap-2 bg-primary text-black font-extrabold text-sm px-5 py-3 rounded-2xl
                       shadow-lg shadow-primary/20 hover:brightness-105 active:scale-95 transition-all uppercase tracking-widest"
          >
            <span className="text-base">+</span> Book Parcel
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {stats.map(stat => (
            <div key={stat.label}
              className={`p-7 bg-${stat.color}-50 rounded-2xl border border-${stat.color}-100 shadow-sm
                          hover:scale-[1.02] transition-transform duration-200 cursor-default`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl">{stat.icon}</span>
                <span className={`text-[10px] font-black uppercase tracking-widest text-${stat.color}-400 bg-${stat.color}-100 px-2 py-1 rounded-full`}>
                  Live
                </span>
              </div>
              <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">{stat.label}</p>
              <p className={`text-4xl font-extrabold text-${stat.color}-900`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link href="/dashboard/book-parcel"
            className="flex items-center gap-5 p-6 bg-secondary rounded-2xl shadow-lg hover:shadow-xl transition group">
            <span className="text-3xl text-white/80"><FaEnvelopeOpenText /></span>
            <div>
              <p className="text-primary font-extrabold uppercase tracking-widest text-xs mb-0.5">Quick Action</p>
              <p className="text-white font-bold text-lg">Book a Parcel</p>
              <p className="text-white/40 text-xs font-medium">Schedule your next delivery</p>
            </div>
            <span className="ml-auto text-white/30 group-hover:text-primary transition text-xl">→</span>
          </Link>
          <Link href="/dashboard/my-orders"
            className="flex items-center gap-5 p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:border-primary/30 hover:shadow-md transition group">
            <span className="text-3xl text-secondary"><FaSearchLocation /></span>
            <div>
              <p className="text-primary font-extrabold uppercase tracking-widest text-xs mb-0.5">Track</p>
              <p className="text-secondary font-bold text-lg">My Orders</p>
              <p className="text-gray-400 text-xs font-medium">View real-time parcel status</p>
            </div>
            <span className="ml-auto text-gray-200 group-hover:text-primary transition text-xl">→</span>
          </Link>
        </div>

        {/* Live Orders Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-50">
            <h2 className="text-lg font-extrabold text-secondary">My Shipments</h2>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest bg-gray-100 px-3 py-1 rounded-full">
              {parcels.length} Total
            </span>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-16 gap-3 text-gray-400">
              <FaSpinner className="animate-spin text-primary text-xl" />
              <span className="font-bold text-sm">Loading your shipments…</span>
            </div>
          ) : parcels.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <span className="text-5xl mb-3 text-gray-300"><FaInbox /></span>
              <p className="text-secondary font-bold">No shipments yet</p>
              <p className="text-gray-400 text-sm mt-1">Book your first parcel to get started.</p>
              <Link href="/dashboard/book-parcel"
                className="mt-4 bg-primary text-black text-xs font-extrabold uppercase tracking-widest px-5 py-2.5 rounded-full hover:brightness-105 transition active:scale-95">
                Book Now →
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    {["Tracking ID", "Receiver", "Type", "Weight", "Cost", "Status", "Date"].map(h => (
                      <th key={h} className="px-5 py-3.5 text-left text-[10px] font-black uppercase tracking-widest text-gray-400">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {parcels.map((parcel, i) => {
                    const cfg = STATUS_CONFIG[parcel.status] || STATUS_CONFIG.pending;
                    return (
                      <tr key={parcel._id}
                        className={`border-b border-gray-50 hover:bg-gray-50/60 transition-colors ${i % 2 === 0 ? "" : "bg-gray-50/30"}`}>
                        <td className="px-5 py-4">
                          <span className="font-extrabold text-secondary text-xs bg-primary/10 px-2 py-1 rounded-lg">
                            {parcel.trackingId}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <p className="font-bold text-secondary">{parcel.receiver?.name}</p>
                          <p className="text-[10px] text-gray-400">{parcel.receiver?.district}</p>
                        </td>
                        <td className="px-5 py-4 font-bold text-gray-600 text-xs">{parcel.type}</td>
                        <td className="px-5 py-4 font-bold text-gray-600 text-xs">{parcel.weight} KG</td>
                        <td className="px-5 py-4 font-extrabold text-secondary text-xs">৳{parcel.deliveryCharge}</td>
                        <td className="px-5 py-4">
                          <span className={`${cfg.bg} ${cfg.text} px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider`}>
                            {cfg.label}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-[10px] text-gray-400 font-semibold whitespace-nowrap">
                          {new Date(parcel.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
