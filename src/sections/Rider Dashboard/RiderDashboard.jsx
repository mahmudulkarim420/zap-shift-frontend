"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import { 
  Package, 
  Truck, 
  CheckCircle2, 
  DollarSign, 
  ArrowRight, 
  Clock, 
  RefreshCw,
  MapPin,
  TrendingUp,
  AlertCircle
} from "lucide-react";
import Link from "next/link";

export default function RiderDashboard() {
  const { data: session } = useSession();
  const [stats, setStats] = useState({
    totalEarnings: 0,
    totalDeliveries: 0,
    activeTasksCount: 0,
    recentDeliveries: [],
    activeTasks: [] // We'll fetch active tasks separately or together
  });
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    if (!session?.accessToken) return;
    try {
      setLoading(true);
      const BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
      const headers = { Authorization: `Bearer ${session.accessToken}` };

      const [statsRes, activeTasksRes] = await Promise.all([
        axios.get(`${BASE}/parcels/rider-stats`, { headers }),
        axios.get(`${BASE}/parcels/my-tasks`, { headers })
      ]);

      if (statsRes.data.success && activeTasksRes.data.success) {
        setStats({
          ...statsRes.data.data,
          activeTasks: activeTasksRes.data.data || [],
          activeTasksCount: activeTasksRes.data.count || 0
        });
      }
    } catch (err) {
      console.error("Failed to fetch rider data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [session]);

  const statCards = [
    {
      title: "Total Earnings",
      value: `৳${stats.totalEarnings}`,
      icon: DollarSign,
      color: "bg-emerald-50 text-emerald-600 border-emerald-100",
      trend: "Verified Payouts"
    },
    {
      title: "Completed",
      value: stats.totalDeliveries,
      icon: CheckCircle2,
      color: "bg-blue-50 text-blue-600 border-blue-100",
      trend: "Success Rate: 100%"
    },
    {
      title: "Active Tasks",
      value: stats.activeTasksCount,
      icon: Truck,
      color: "bg-amber-50 text-amber-600 border-amber-100",
      trend: "Action Required"
    },
    {
      title: "Performance",
      value: "Elite",
      icon: TrendingUp,
      color: "bg-violet-50 text-violet-600 border-violet-100",
      trend: "Top 5% Rider"
    }
  ];

  return (
    <DashboardLayout roleName="Rider">
      <div className="space-y-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-2">Operations Center</p>
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">Rider Overview</h1>
            <p className="text-sm text-gray-400 font-medium mt-1">Real-time logistical monitoring and performance audit.</p>
          </div>
          <div className="flex items-center gap-3">
             <button 
              onClick={fetchData}
              className="p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:bg-gray-50 transition-all group"
             >
               <RefreshCw className={`w-5 h-5 text-gray-400 group-hover:text-secondary ${loading ? 'animate-spin' : ''}`} />
             </button>
             <Link 
              href="/dashboard/my-tasks"
              className="bg-secondary text-white px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest shadow-2xl shadow-secondary/20 hover:scale-[1.03] active:scale-[0.97] transition-all flex items-center gap-3"
             >
               Manage Tasks <ArrowRight className="w-4 h-4 text-primary" />
             </Link>
          </div>
        </div>

        {/* Dynamic Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((card, idx) => (
            <div key={idx} className={`p-8 rounded-[2.5rem] border shadow-sm transition-all hover:shadow-xl hover:shadow-gray-200/50 ${card.color}`}>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-60">{card.title}</p>
                  <h3 className="text-4xl font-black tracking-tighter">{loading ? "..." : card.value}</h3>
                  <div className="flex items-center gap-2 mt-4">
                     <span className="text-[10px] font-bold opacity-70 italic">{card.trend}</span>
                  </div>
                </div>
                <div className="p-4 bg-white/40 backdrop-blur-md rounded-2xl shadow-inner">
                  <card.icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Sections */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
          
          {/* Active Tasks Column */}
          <div className="xl:col-span-7 space-y-8">
            <div className="flex items-center justify-between">
               <h2 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-4">
                  <Truck className="text-secondary w-8 h-8" />
                  Your Active Tasks
               </h2>
               <Link href="/dashboard/my-tasks" className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline">See All</Link>
            </div>

            <div className="grid gap-6">
              {loading ? (
                [1, 2].map(i => <div key={i} className="h-40 bg-gray-50 rounded-[2.5rem] animate-pulse" />)
              ) : stats.activeTasks.length > 0 ? (
                stats.activeTasks.map((task) => (
                  <Link 
                    href="/dashboard/my-tasks"
                    key={task._id} 
                    className="p-8 bg-white border border-gray-100 rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:shadow-gray-100/50 transition-all duration-500 group relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-primary/10 transition-colors" />
                    
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                           <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border border-secondary/5">
                             {task.status.replace(/_/g, ' ')}
                           </span>
                           <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">ID: #{task._id.slice(-6)}</span>
                        </div>
                        <h4 className="text-xl font-black text-gray-900 group-hover:text-secondary transition-colors">Route: {task.receiver?.district}</h4>
                        <div className="flex items-center gap-6">
                           <div className="flex items-center gap-2 text-xs text-gray-500 font-bold">
                              <MapPin className="w-4 h-4 text-gray-300" />
                              {task.receiver?.district}
                           </div>
                           <div className="flex items-center gap-2 text-xs text-gray-500 font-bold">
                              <Clock className="w-4 h-4 text-gray-300" />
                              Urgent Delivery
                           </div>
                        </div>
                      </div>
                      <div className="text-right">
                         <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Fee Potential</p>
                         <h5 className="text-3xl font-black text-secondary">৳{task.deliveryCharge}</h5>
                         <ArrowRight className="w-6 h-6 text-primary mt-4 ml-auto group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="p-20 text-center bg-gray-50/50 rounded-[3rem] border border-dashed border-gray-200">
                  <div className="w-20 h-20 bg-white rounded-[2rem] shadow-sm flex items-center justify-center mx-auto mb-6">
                    <Package className="w-10 h-10 text-gray-200" />
                  </div>
                  <h3 className="text-xl font-black text-gray-900">Zero Active Tasks</h3>
                  <p className="text-sm text-gray-400 mt-2 max-w-xs mx-auto">Pick up new deliveries from the board to start earning.</p>
                  <Link href="/dashboard/rider/available-deliveries" className="mt-8 inline-block px-8 py-3 bg-secondary text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-secondary/20">Find Work</Link>
                </div>
              )}
            </div>
          </div>

          {/* Side Column: Recent & Quick Info */}
          <div className="xl:col-span-5 space-y-10">
            
            {/* Recent Deliveries */}
            <div className="bg-white border border-gray-100 rounded-[3rem] p-8 lg:p-10 shadow-sm relative overflow-hidden">
               <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-black text-gray-900 tracking-tight">Recent Payouts</h3>
                  <TrendingUp className="text-emerald-500 w-5 h-5" />
               </div>
               <div className="space-y-6">
                  {stats.recentDeliveries.slice(0, 5).map((delivery) => (
                    <div key={delivery._id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-2xl transition-colors">
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                             <CheckCircle2 size={18} />
                          </div>
                          <div>
                             <p className="text-sm font-black text-gray-900">{delivery.receiver?.name}</p>
                             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Verified Delivery</p>
                          </div>
                       </div>
                       <p className="text-sm font-black text-emerald-600">+৳{delivery.deliveryCharge}</p>
                    </div>
                  ))}
               </div>
            </div>

            {/* Quick Tips / Protocol */}
            <div className="bg-[#033C3F] rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl">
               <div className="absolute top-0 right-0 p-8 opacity-10">
                  <AlertCircle size={100} />
               </div>
               <div className="relative z-10">
                  <p className="text-[#C8FF65] text-[10px] font-black uppercase tracking-[0.2em] mb-4">Elite Protocol</p>
                  <h4 className="text-2xl font-black tracking-tight leading-tight mb-6">Always verify the tracking ID before pickup.</h4>
                  <p className="text-white/60 text-xs leading-relaxed mb-8">Fast, secure, and professional delivery ensures your Elite tier status remains active.</p>
                  <div className="flex items-center gap-2 text-[#C8FF65]">
                     <ShieldCheck size={16} />
                     <span className="text-[10px] font-black uppercase tracking-widest">ZapShift Certified</span>
                  </div>
               </div>
            </div>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}

function ShieldCheck({ size = 24 }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
