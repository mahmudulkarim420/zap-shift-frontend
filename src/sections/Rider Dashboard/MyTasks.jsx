"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import RoleGuard from "@/components/RoleGuard";
import { 
  Package, 
  MapPin, 
  Navigation, 
  CheckCircle2, 
  Truck, 
  Clock,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Phone,
  RefreshCw,
  MoreVertical,
  DollarSign
} from "lucide-react";
import Swal from "sweetalert2";

export default function MyTasks() {
  const { data: session } = useSession();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchTasks = useCallback(async () => {
    if (!session?.accessToken) return;
    const BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
    const headers = { Authorization: `Bearer ${session.accessToken}` };

    try {
      setLoading(true);
      const res = await axios.get(`${BASE}/parcels/my-tasks`, { headers });
      if (res.data.success) {
        setTasks(res.data.data || []);
      }
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    } finally {
      setLoading(false);
    }
  }, [session]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleStatusUpdate = async (parcelId, currentStatus, trackingId) => {
    const transitions = {
      "paid": { next: "picked_up", label: "Mark as Picked Up" },
      "picked_up": { next: "delivered", label: "Confirm Delivery" }
    };

    const nextStep = transitions[currentStatus];
    if (!nextStep) return;

    try {
      const result = await Swal.fire({
        title: "Update Status?",
        text: `Are you sure you want to change ${trackingId} to ${nextStep.next.replace(/_/g, ' ')}?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#C8FF65",
        cancelButtonColor: "#f4f4f5",
        confirmButtonText: "Yes, update",
        cancelButtonText: "Cancel",
        customClass: {
          confirmButton: 'text-secondary font-bold',
          cancelButton: 'text-gray-500 font-bold'
        }
      });

      if (result.isConfirmed) {
        setUpdatingId(parcelId);
        const BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
        const headers = { Authorization: `Bearer ${session.accessToken}` };
        
        const res = await axios.put(`${BASE}/parcels/update-status/${parcelId}`, { 
          status: nextStep.next 
        }, { headers });
        
        if (res.data.success) {
          Swal.fire({
            title: "Success!",
            text: `Status updated to ${nextStep.next.replace(/_/g, ' ')}`,
            icon: "success",
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
          });
          
          if (nextStep.next === "delivered") {
            setTasks(prev => prev.filter(t => t._id !== parcelId));
          } else {
            setTasks(prev => prev.map(t => t._id === parcelId ? { ...t, status: nextStep.next } : t));
          }
        }
      }
    } catch (err) {
      Swal.fire("Error", "Failed to update status.", "error");
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "accepted": return "bg-blue-50 text-blue-700 border-blue-100";
      case "awaiting_payment": return "bg-orange-50 text-orange-700 border-orange-100";
      case "paid": return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case "picked_up": return "bg-indigo-50 text-indigo-700 border-indigo-100";
      case "delivered": return "bg-green-50 text-green-700 border-green-100";
      default: return "bg-gray-50 text-gray-700 border-gray-100";
    }
  };

  return (
    <RoleGuard allowedRoles={['rider']}>
      <DashboardLayout roleName="Rider">
        <div className="space-y-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">My Active Tasks</h1>
            <p className="mt-1 text-sm text-gray-500">Manage your ongoing deliveries and track your progress.</p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-40 bg-gray-100 animate-pulse rounded-[2rem]" />
              ))}
            </div>
          ) : tasks.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {tasks.map((task) => (
                <div 
                  key={task._id}
                  className="bg-white border border-gray-100 rounded-[2.5rem] p-6 lg:p-8 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-500"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                    {/* Primary Info */}
                    <div className="flex items-start gap-6">
                      <div className={`p-4 rounded-3xl shrink-0 ${getStatusColor(task.status)} shadow-sm`}>
                        <Truck className="w-8 h-8" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-black text-gray-900 tracking-tight">{task.trackingId}</h3>
                          <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusColor(task.status)}`}>
                            {task.status === "paid" ? "Paid / Ready" : 
                             task.status === "picked_up" ? "In Transit" : 
                             task.status.replace(/_/g, ' ')}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-sm text-gray-500">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span className="font-bold">To: {task.receiver.district}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-gray-400" />
                            <span className="font-medium">{task.receiver.phone}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-emerald-500" />
                            <span className="font-black text-emerald-700">৳{task.deliveryCharge} Fee</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4 border-t lg:border-t-0 pt-6 lg:pt-0">
                      {task.status !== "delivered" && (
                        <button 
                          onClick={() => handleStatusUpdate(task._id, task.status, task.trackingId)}
                          disabled={updatingId === task._id || task.status === "accepted" || task.status === "awaiting_payment"}
                          className={`flex-1 lg:flex-none flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-xl disabled:opacity-50 disabled:grayscale ${
                            task.status === 'paid' ? 'bg-[#C8FF65] text-[#033C3F] shadow-[#C8FF65]/20 hover:scale-[1.02]' : 'bg-secondary text-white shadow-secondary/20 hover:scale-[1.02]'
                          }`}
                        >
                          {updatingId === task._id ? (
                            <RefreshCw className="w-4 h-4 animate-spin" />
                          ) : (
                            <>
                              {task.status === "accepted" ? "Pending Admin Approval" : 
                               task.status === "awaiting_payment" ? "Awaiting Payment" :
                               task.status === "paid" ? "Start Delivery / Pick Up" :
                               "Mark As Delivered ✓"}
                              {task.status !== "picked_up" && <ArrowRight className="w-4 h-4" />}
                            </>
                          )}
                        </button>
                      )}
                      
                      <button className="p-4 bg-gray-50 text-gray-400 rounded-2xl hover:bg-gray-100 transition-colors">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Secondary Details Row */}
                  <div className="mt-8 flex flex-wrap items-center gap-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
                    <div className="flex items-center gap-2 italic">
                      <Clock className="w-3.5 h-3.5" />
                      Assigned: {new Date(task.updatedAt).toLocaleString()}
                    </div>
                    <div className="w-1 h-1 bg-gray-300 rounded-full" />
                    <div className="flex items-center gap-2 italic">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Receiver: {task.receiver.name}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 bg-violet-50/20 rounded-[3rem] border border-dashed border-violet-100">
              <div className="w-20 h-20 bg-white rounded-3xl shadow-sm flex items-center justify-center mb-6">
                <Package className="w-10 h-10 text-violet-200" />
              </div>
              <h3 className="text-xl font-black text-gray-900">Your task list is empty</h3>
              <p className="text-sm text-gray-500 mt-2 max-w-xs text-center leading-relaxed">
                You haven&apos;t accepted any parcels yet. Head over to available deliveries to find work.
              </p>
              <button 
                onClick={() => window.location.href = '/dashboard/rider/available-deliveries'}
                className="mt-8 flex items-center gap-2 bg-primary text-secondary px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-105 transition-all"
              >
                Find Deliveries
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </DashboardLayout>
    </RoleGuard>
  );
}
