"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import RoleGuard from "@/components/RoleGuard";
import { 
  Package, 
  MapPin, 
  Weight, 
  DollarSign, 
  Truck, 
  Search, 
  RefreshCw,
  Clock,
  ArrowRight,
  ShieldCheck,
  Zap
} from "lucide-react";
import Swal from "sweetalert2";

export default function AvailableDeliveries() {
  const { data: session } = useSession();
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [acceptingId, setAcceptingId] = useState(null);

  const fetchAvailableParcels = useCallback(async () => {
    if (!session?.accessToken) return;
    const BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
    const headers = { Authorization: `Bearer ${session.accessToken}` };

    try {
      setLoading(true);
      const res = await axios.get(`${BASE}/parcels/available`, { headers });
      if (res.data.success) {
        setParcels(res.data.data || []);
      }
    } catch (err) {
      console.error("Failed to fetch available parcels:", err);
    } finally {
      setLoading(false);
    }
  }, [session]);

  useEffect(() => {
    fetchAvailableParcels();
  }, [fetchAvailableParcels]);

  const handleAccept = async (parcelId, trackingId) => {
    try {
      setAcceptingId(parcelId);
      const BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
      const headers = { Authorization: `Bearer ${session.accessToken}` };
      
      const res = await axios.put(`${BASE}/parcels/accept/${parcelId}`, {}, { headers });
      
      if (res.data.success) {
        Swal.fire({
          title: "Order Accepted!",
          text: `Parcel ${trackingId} has been added to your tasks.`,
          icon: "success",
          confirmButtonColor: "#C8FF65",
        });
        
        // Remove from list
        setParcels(prev => prev.filter(p => p._id !== parcelId));
      }
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message || "Failed to accept parcel.", "error");
    } finally {
      setAcceptingId(null);
    }
  };

  const filteredParcels = parcels.filter(p => 
    p.trackingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.receiver.district.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <RoleGuard allowedRoles={['rider']}>
      <DashboardLayout roleName="Rider">
        <div className="space-y-8">
          {/* Header Section */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">Available Deliveries</h1>
              <p className="mt-1 text-sm text-gray-500">Pick up open orders and start earning today.</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 rounded-2xl shadow-sm">
                <Search className="w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search district..." 
                  className="bg-transparent outline-none text-sm text-gray-700 w-32 md:w-48"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button 
                onClick={fetchAvailableParcels}
                className="p-2.5 bg-white border border-gray-100 rounded-2xl hover:bg-gray-50 transition-colors shadow-sm"
              >
                <RefreshCw className={`w-5 h-5 text-gray-600 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>

          {/* Available Count Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-secondary/5 border border-secondary/10 rounded-full">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-xs font-black text-secondary uppercase tracking-widest">
              {parcels.length} Active Listings
            </span>
          </div>

          {/* Grid View */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-64 bg-gray-100 animate-pulse rounded-[2rem]" />
              ))}
            </div>
          ) : filteredParcels.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredParcels.map((parcel) => (
                <div 
                  key={parcel._id}
                  className="group bg-white border border-gray-100 rounded-[2rem] p-6 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-primary/20 transition-colors duration-500" />
                  
                  <div className="relative flex flex-col h-full">
                    <div className="flex justify-between items-start mb-6">
                      <div className="p-3 bg-secondary/5 rounded-2xl text-secondary">
                        <Package className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest bg-gray-50 px-3 py-1 rounded-full">
                        {parcel.trackingId}
                      </span>
                    </div>

                    <div className="space-y-4 flex-1">
                      <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Delivery Route</p>
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col items-center gap-1">
                            <div className="w-2 h-2 rounded-full bg-primary" />
                            <div className="w-0.5 h-6 border-l border-dashed border-gray-200" />
                            <div className="w-2 h-2 rounded-full bg-secondary" />
                          </div>
                          <div className="flex flex-col gap-2">
                            <p className="text-xs font-bold text-gray-700 truncate">{parcel.currentWarehouse || "Central Hub"}</p>
                            <p className="text-xs font-black text-gray-950 truncate">{parcel.receiver.district}, BD</p>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-2">
                        <div className="flex items-center gap-2">
                          <Weight className="w-3.5 h-3.5 text-gray-400" />
                          <span className="text-xs font-bold text-gray-600">{parcel.weight} KG</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Zap className="w-3.5 h-3.5 text-primary" />
                          <span className="text-xs font-bold text-gray-600">{parcel.type}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-50 flex items-center justify-between">
                      <div>
                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Earnings</p>
                        <h4 className="text-xl font-black text-secondary">৳{parcel.deliveryCharge}</h4>
                      </div>
                      
                      <button 
                        onClick={() => handleAccept(parcel._id, parcel.trackingId)}
                        disabled={acceptingId === parcel._id}
                        className="flex items-center gap-2 bg-primary text-secondary px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                      >
                        {acceptingId === parcel._id ? (
                          <RefreshCw className="w-4 h-4 animate-spin" />
                        ) : (
                          <>
                            Accept
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 bg-gray-50/50 rounded-[3rem] border border-dashed border-gray-200">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4">
                <Truck className="w-8 h-8 text-gray-300" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">No deliveries available</h3>
              <p className="text-sm text-gray-500 mt-1 max-w-xs text-center">Check back soon or refresh to see new listings in your area.</p>
              <button 
                onClick={fetchAvailableParcels}
                className="mt-6 px-6 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all"
              >
                Refresh Board
              </button>
            </div>
          )}
        </div>
      </DashboardLayout>
    </RoleGuard>
  );
}
