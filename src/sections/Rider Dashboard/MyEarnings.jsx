"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import RoleGuard from "@/components/RoleGuard";
import { 
  DollarSign, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  ArrowUpRight, 
  Calendar,
  Wallet,
  Briefcase,
  History,
  ArrowRight,
  PieChart,
  ArrowDownRight,
  Download,
  Info
} from "lucide-react";

export default function MyEarnings() {
  const { data: session } = useSession();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = useCallback(async () => {
    if (!session?.accessToken) return;
    const BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
    const headers = { Authorization: `Bearer ${session.accessToken}` };

    try {
      setLoading(true);
      const res = await axios.get(`${BASE}/parcels/rider-stats`, { headers });
      if (res.data.success) {
        setStats(res.data.data);
      }
    } catch (err) {
      console.error("Failed to fetch rider stats:", err);
    } finally {
      setLoading(false);
    }
  }, [session]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return (
    <RoleGuard allowedRoles={['rider']}>
      <DashboardLayout roleName="Rider">
        <div className="space-y-12">
          {/* Top Banner Section */}
          <div className="relative p-10 lg:p-14 rounded-[3.5rem] overflow-hidden group shadow-2xl shadow-gray-200">
            {/* Background Gradient & Pattern */}
            <div className="absolute inset-0 bg-[#033C3F] transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#C8FF65] via-transparent to-transparent" />
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
            
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-10">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 rounded-full border border-white/10 mb-6 backdrop-blur-md">
                  <span className="w-1.5 h-1.5 bg-[#C8FF65] rounded-full animate-pulse" />
                  <span className="text-[10px] font-black text-white/80 uppercase tracking-[0.2em]">Live Earnings Wallet</span>
                </div>
                <h1 className="text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                  Your growth is <span className="text-[#C8FF65]">accelerating</span>.
                </h1>
                <p className="mt-4 text-white/60 text-base font-medium max-w-md leading-relaxed">
                  Excellent work this week! You've maintained a 98% delivery success rate. Keep up the momentum to unlock gold-tier bonuses.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 md:min-w-[300px] text-center shadow-2xl">
                <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em] mb-2">Withdrawable Balance</p>
                <div className="flex items-center justify-center gap-2">
                   <h2 className="text-5xl font-black text-white">৳{stats?.totalEarnings || 0}</h2>
                </div>
                <button className="mt-8 w-full py-4 bg-[#C8FF65] text-[#033C3F] rounded-2xl text-xs font-black uppercase tracking-widest hover:scale-[1.03] active:scale-[0.97] transition-all shadow-xl shadow-[#C8FF65]/20">
                  Withdraw Funds
                </button>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard 
              icon={<TrendingUp className="w-5 h-5" />} 
              label="Efficiency" 
              value="94.2%" 
              trend="+2.4%" 
              color="emerald" 
            />
            <StatCard 
              icon={<CheckCircle2 className="w-5 h-5" />} 
              label="Deliveries" 
              value={stats?.totalDeliveries || 0} 
              trend="Target: 150" 
              color="blue" 
            />
            <StatCard 
              icon={<Clock className="w-5 h-5" />} 
              label="Active Tasks" 
              value={stats?.activeTasks || 0} 
              trend="Avg 45min" 
              color="orange" 
            />
            <StatCard 
              icon={<DollarSign className="w-5 h-5" />} 
              label="Avg / Trip" 
              value={`৳${stats?.totalDeliveries > 0 ? (stats.totalEarnings / stats.totalDeliveries).toFixed(0) : 0}`} 
              trend="Premium Rate" 
              color="purple" 
            />
          </div>

          {/* Content Row: Chart & History */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            
            {/* Visual Analytics Card */}
            <div className="xl:col-span-1 bg-white border border-gray-100 rounded-[3rem] p-8 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-black text-gray-900 tracking-tight">Trip Breakdown</h3>
                <PieChart className="w-5 h-5 text-gray-400" />
              </div>
              
              {/* Mock Chart Visualization */}
              <div className="relative h-64 flex items-center justify-center">
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="w-48 h-48 rounded-full border-[12px] border-[#033C3F] border-r-transparent border-b-[#C8FF65]/40 rotate-45" />
                </div>
                <div className="text-center z-10">
                  <p className="text-[10px] font-black text-gray-400 uppercase">Success</p>
                  <h4 className="text-3xl font-black text-gray-900">98%</h4>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <LegendItem color="bg-[#033C3F]" label="Completed" percent="92%" />
                <LegendItem color="bg-[#C8FF65]" label="In Progress" percent="6%" />
                <LegendItem color="bg-red-400" label="Cancelled" percent="2%" />
              </div>
            </div>

            {/* History Table Card */}
            <div className="xl:col-span-2 bg-white border border-gray-100 rounded-[3rem] p-8 lg:p-10 shadow-sm relative overflow-hidden">
               <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gray-50 rounded-2xl">
                    <History className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-gray-900 tracking-tight">Recent Payouts</h3>
                    <p className="text-xs font-medium text-gray-400">Detailed list of your last 10 deliveries</p>
                  </div>
                </div>
                <button className="flex items-center gap-2 px-6 py-3 bg-gray-50 rounded-2xl text-[10px] font-black text-gray-600 uppercase tracking-widest hover:bg-gray-100 transition-all border border-gray-100">
                  <Download className="w-3.5 h-3.5" />
                  Export Data
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-50">
                      <th className="pb-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Parcel ID</th>
                      <th className="pb-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Completed At</th>
                      <th className="pb-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Service Fee</th>
                      <th className="pb-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {stats?.recentDeliveries?.length > 0 ? (
                      stats.recentDeliveries.map((item) => (
                        <tr key={item._id} className="group hover:bg-gray-50/80 transition-all duration-300">
                          <td className="py-6">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-colors">
                                <Info className="w-3.5 h-3.5" />
                              </div>
                              <span className="text-sm font-black text-gray-900">{item.trackingId}</span>
                            </div>
                          </td>
                          <td className="py-6">
                            <span className="text-xs font-bold text-gray-500">
                              {new Date(item.updatedAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                            </span>
                          </td>
                          <td className="py-6 text-right">
                            <span className="text-sm font-black text-secondary">৳{item.deliveryCharge}</span>
                          </td>
                          <td className="py-6 text-right">
                            <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[9px] font-black uppercase tracking-widest border border-emerald-100">
                              Released
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="py-24 text-center">
                          <div className="flex flex-col items-center">
                            <div className="w-20 h-20 bg-gray-50 rounded-[2rem] flex items-center justify-center mb-6">
                              <Wallet className="w-10 h-10 text-gray-200" />
                            </div>
                            <h4 className="text-base font-black text-gray-900">No earnings data yet</h4>
                            <p className="text-sm text-gray-400 mt-1">Complete your first delivery to start seeing history.</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </RoleGuard>
  );
}

function StatCard({ icon, label, value, trend, color }) {
  const colors = {
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    orange: "bg-orange-50 text-orange-600 border-orange-100",
    purple: "bg-purple-50 text-purple-600 border-purple-100",
  };

  return (
    <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-500 group">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 border ${colors[color]} group-hover:scale-110 transition-transform duration-500`}>
        {icon}
      </div>
      <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">{label}</p>
      <h3 className="text-3xl font-black text-gray-900">{value}</h3>
      <div className="mt-4 flex items-center gap-1.5">
        <TrendingUp className={`w-3 h-3 ${color === 'emerald' ? 'text-emerald-500' : 'text-gray-300'}`} />
        <span className={`text-[10px] font-bold ${color === 'emerald' ? 'text-emerald-500' : 'text-gray-400'}`}>
          {trend}
        </span>
      </div>
    </div>
  );
}

function LegendItem({ color, label, percent }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-2xl hover:bg-gray-50 transition-colors">
      <div className="flex items-center gap-3">
        <div className={`w-2 h-2 rounded-full ${color}`} />
        <span className="text-xs font-bold text-gray-600">{label}</span>
      </div>
      <span className="text-xs font-black text-gray-900">{percent}</span>
    </div>
  );
}
