"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import { FaSearch, FaFilter, FaSpinner, FaBoxOpen, FaEye, FaCreditCard, FaCheckCircle, FaTimes, FaLightbulb } from "react-icons/fa";
import Link from "next/link";
import Swal from "sweetalert2";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/Payment/CheckoutForm";
import { FaMobileAlt, FaGlobe } from "react-icons/fa";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const STATUS_CONFIG = {
  pending:          { label: "Pending",           bg: "bg-amber-100",   text: "text-amber-800"   },
  accepted:         { label: "Accepted",          bg: "bg-blue-100",    text: "text-blue-800"    },
  awaiting_payment: { label: "Awaiting Payment",  bg: "bg-orange-100",  text: "text-orange-800"  },
  paid:             { label: "Paid",              bg: "bg-emerald-100", text: "text-emerald-800" },
  picked_up:        { label: "Picked Up",         bg: "bg-indigo-100",  text: "text-indigo-800"  },
  delivered:        { label: "Delivered",         bg: "bg-green-100",   text: "text-green-800"   },
  cancelled:        { label: "Cancelled",         bg: "bg-red-100",     text: "text-red-800"     },
  returned:         { label: "Returned",          bg: "bg-gray-100",    text: "text-gray-600"    },
};

export default function MyOrders() {
  const { data: session } = useSession();
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showGatewayModal, setShowGatewayModal] = useState(false);
  const [selectedParcel, setSelectedParcel] = useState(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  const fetchOrders = async () => {
    if (!session?.accessToken) return;
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

  useEffect(() => {
    fetchOrders();
    
    // Check for payment success from SSLCommerz redirect
    const paymentParam = searchParams.get("payment");
    if (paymentParam === "success") {
      router.replace("/dashboard/my-orders");
      Swal.fire({
        title: "Payment Successful!",
        text: "Your parcel is now being processed for delivery.",
        icon: "success",
        confirmButtonColor: "#C8FF65",
        confirmButtonText: "Awesome",
        backdrop: `rgba(3, 60, 63, 0.4) url("https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHpneHoxZ3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/l0MYt5jPR6QX5pnqM/giphy.gif") center center no-repeat`
      });
    } else if (paymentParam === "failed") {
      router.replace("/dashboard/my-orders");
      Swal.fire("Payment Failed", "Something went wrong with the local gateway.", "error");
    }
  }, [session, searchParams, router]);

  const handleOpenPayment = (parcel) => {
    setSelectedParcel(parcel);
    setShowGatewayModal(true);
  };

  const handleSSLInit = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/payments/ssl-init`,
        { parcelId: selectedParcel._id, amount: selectedParcel.deliveryCharge },
        { headers: { Authorization: `Bearer ${session.accessToken}` } }
      );
      if (res.data.success && res.data.url) {
        window.location.href = res.data.url;
      }
    } catch (err) {
      Swal.fire("Error", "Local payment gateway initialization failed.", "error");
    }
  };

  const handleStripeChoice = () => {
    setShowGatewayModal(false);
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = () => {
    setShowPaymentModal(false);
    setSelectedParcel(null);
    fetchOrders();
  };

  const handleCancelOrder = async (parcelId) => {
    const result = await Swal.fire({
      title: "Cancel this order?",
      text: "This action will terminate your booking. If you already paid, please contact support for a refund.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Yes, Cancel",
      cancelButtonText: "No, Keep it"
    });

    if (result.isConfirmed) {
      try {
        const res = await axios.put(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/parcels/cancel/${parcelId}`,
          {},
          { headers: { Authorization: `Bearer ${session.accessToken}` } }
        );
        if (res.data.success) {
          Swal.fire("Cancelled!", "Your order has been cancelled.", "success");
          fetchOrders();
        }
      } catch (err) {
        Swal.fire("Error", err.response?.data?.message || "Failed to cancel order", "error");
      }
    }
  };

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
        <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden relative">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <FaSpinner className="animate-spin text-3xl text-primary" />
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Loading your parcels…</p>
            </div>
          ) : filteredParcels.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-4xl text-gray-300"><FaBoxOpen /></div>
              <h3 className="text-xl font-extrabold text-secondary mb-1">No orders found</h3>
              <p className="text-gray-400 text-sm max-w-xs mx-auto">
                {searchTerm || statusFilter !== "all" 
                  ? "We couldn't find any orders matching your current filters."
                  : "You haven't booked any parcels yet. Start shipping today!"}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-100">
                    {["Tracking ID", "Receiver", "Type & Weight", "Total Cost", "Status", "Action"].map(h => (
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
                          <div className="flex items-center gap-3">
                            {parcel.status === 'awaiting_payment' ? (
                              <button
                                onClick={() => handleOpenPayment(parcel)}
                                className="px-4 py-2 bg-[#C8FF65] text-[#033C3F] text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg shadow-[#C8FF65]/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                              >
                                <FaCreditCard /> Pay Now
                              </button>
                            ) : parcel.status === 'paid' ? (
                              <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-1">
                                <FaCheckCircle /> Paid
                              </span>
                            ) : (
                              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                 {new Date(parcel.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                              </p>
                            )}

                            {['pending', 'accepted', 'awaiting_payment', 'paid'].includes(parcel.status) && (
                              <button
                                onClick={() => handleCancelOrder(parcel._id)}
                                className="text-red-400 hover:text-red-600 transition-colors"
                                title="Cancel Order"
                              >
                                <FaTimes className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Gateway Selection Modal */}
        {showGatewayModal && selectedParcel && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
             <div className="absolute inset-0 bg-[#033C3F]/60 backdrop-blur-md" onClick={() => setShowGatewayModal(false)} />
             <div className="relative bg-white w-full max-w-lg rounded-[3rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
                <div className="bg-secondary p-10 text-white text-center">
                   <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-2">Dual Payment Gateway</p>
                   <h3 className="text-3xl font-black tracking-tight">Select Payment Route</h3>
                   <p className="text-white/60 text-sm mt-2 font-medium">Pay ৳{selectedParcel.deliveryCharge} securely via your preferred method.</p>
                </div>
                <div className="p-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
                   <button 
                    onClick={handleStripeChoice}
                    className="group flex flex-col items-center justify-center p-8 bg-gray-50 border border-gray-100 rounded-[2.5rem] hover:bg-primary hover:border-primary transition-all duration-300 shadow-sm"
                   >
                      <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-secondary mb-4 shadow-sm group-hover:scale-110 transition-transform">
                         <FaGlobe size={24} />
                      </div>
                      <p className="text-xs font-black uppercase tracking-widest text-secondary mb-1">Stripe</p>
                      <p className="text-[9px] font-bold text-gray-400 group-hover:text-secondary/70">International Cards</p>
                   </button>
                   <button 
                    onClick={handleSSLInit}
                    className="group flex flex-col items-center justify-center p-8 bg-gray-50 border border-gray-100 rounded-[2.5rem] hover:bg-[#C8FF65] hover:border-[#C8FF65] transition-all duration-300 shadow-sm"
                   >
                      <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-[#033C3F] mb-4 shadow-sm group-hover:scale-110 transition-transform">
                         <FaMobileAlt size={24} />
                      </div>
                      <p className="text-xs font-black uppercase tracking-widest text-secondary mb-1">SSLCommerz</p>
                      <p className="text-[9px] font-bold text-gray-400 group-hover:text-secondary/70">bKash, Nagad, Local Cards</p>
                   </button>
                </div>
                <div className="px-10 pb-10">
                   <button onClick={() => setShowGatewayModal(false)} className="w-full py-4 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-secondary transition-colors">Maybe later</button>
                </div>
             </div>
          </div>
        )}

        {/* Stripe Modal Overlay */}
        {showPaymentModal && selectedParcel && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
             <div className="absolute inset-0 bg-[#033C3F]/60 backdrop-blur-md" onClick={() => setShowPaymentModal(false)} />
             
             <div className="relative bg-white w-full max-w-md rounded-[3rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
                <div className="bg-secondary p-8 text-white relative">
                   <button 
                    onClick={() => setShowPaymentModal(false)}
                    className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
                   >
                     <FaTimes />
                   </button>
                   <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50 mb-2">Secure Stripe Checkout</p>
                   <h3 className="text-2xl font-black tracking-tight">International Card</h3>
                   <div className="mt-6 flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
                      <div>
                        <p className="text-[10px] font-black uppercase text-white/40 mb-1">Parcel ID</p>
                        <p className="text-sm font-bold">{selectedParcel.trackingId}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-black uppercase text-white/40 mb-1">Amount Due</p>
                        <p className="text-xl font-black text-primary">৳{selectedParcel.deliveryCharge}</p>
                      </div>
                   </div>
                </div>

                <div className="p-8">
                   <Elements stripe={stripePromise}>
                      <CheckoutForm 
                        parcelId={selectedParcel._id}
                        amount={selectedParcel.deliveryCharge}
                        token={session.accessToken}
                        onSuccess={handlePaymentSuccess}
                        onCancel={() => setShowPaymentModal(false)}
                      />
                   </Elements>
                </div>
             </div>
          </div>
        )}

        {/* Footer info */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-secondary p-6 rounded-3xl">
          <div className="flex items-center gap-3">
            <span className="text-2xl text-yellow-400"><FaLightbulb /></span>
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
