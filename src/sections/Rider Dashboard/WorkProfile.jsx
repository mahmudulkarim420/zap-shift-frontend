"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import RoleGuard from "@/components/RoleGuard";
import { 
  Briefcase, 
  Award, 
  ShieldCheck, 
  Zap, 
  Clock, 
  MapPin, 
  TrendingUp, 
  Star,
  CheckCircle2,
  AlertCircle,
  Truck,
  Bike,
  Activity,
  BarChart3,
  Search,
  Package,
  User,
  Mail,
  Phone,
  Camera,
  Spinner
} from "lucide-react";
import Swal from "sweetalert2";

export default function WorkProfile() {
  const { data: session, update } = useSession();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
      setPhone(session.user.phone || "");
    }
  }, [session]);

  useEffect(() => {
    const fetchWorkData = async () => {
      if (!session?.accessToken) return;
      try {
        setLoading(true);
        const BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
        const res = await axios.get(`${BASE}/parcels/rider-stats`, {
          headers: { Authorization: `Bearer ${session.accessToken}` }
        });
        if (res.data.success) {
          setStats(res.data.data);
        }
      } catch (err) {
        console.error("Failed to fetch work stats:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchWorkData();
  }, [session]);

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
      const res = await axios.put(
        `${BASE}/auth/update-profile`,
        { name, phone },
        { headers: { Authorization: `Bearer ${session?.accessToken}` } }
      );

      if (res.data?.success) {
        await update({ name, phone });
        Swal.fire({ title: "Success", text: "Profile updated!", icon: "success", toast: true, position: 'top-end', showConfirmButton: false, timer: 3000 });
      }
    } catch (err) {
      Swal.fire("Error", "Failed to update profile", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const initial = (name || session?.user?.email || "R").charAt(0).toUpperCase();

  return (
    <RoleGuard allowedRoles={['rider']}>
      <DashboardLayout roleName="Rider">
        <div className="max-w-7xl mx-auto space-y-8 pb-20">
          
          {/* ── Refined Header Section (Cleaner Style) ── */}
          <div className="bg-secondary rounded-[2.5rem] px-8 py-10 relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(200,255,101,0.05),transparent_60%)] pointer-events-none" />
            <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-2xl bg-primary/20 border-2 border-primary/40 flex items-center justify-center text-3xl font-black text-primary shadow-lg overflow-hidden">
                  {session?.user?.image ? (
                    <img src={session.user.image} alt={name} className="w-full h-full object-cover" />
                  ) : initial}
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">Operational ID: ZS-R-{session?.user?.id?.slice(-6) || "X92K"}</p>
                  <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                    {name || "Rider Profile"}
                  </h1>
                  <p className="text-white/50 text-xs font-bold mt-1 uppercase tracking-widest flex items-center gap-2">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    Elite Tier Verified
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                 <span className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/10 rounded-full text-[9px] font-black text-white uppercase tracking-widest">
                   Dhaka Fleet
                 </span>
                 <span className="px-4 py-2 bg-primary text-secondary rounded-full text-[9px] font-black uppercase tracking-widest">
                   Active Status
                 </span>
              </div>
            </div>
          </div>

          {/* ── Main Two-Column Structure ── */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
            
            {/* ── Left Column: Personal Info ── */}
            <div className="space-y-8">
               <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 lg:p-10 shadow-sm">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">Security & Identity</p>
                      <h2 className="text-2xl font-black text-gray-900">Personal Info</h2>
                    </div>
                    <span className="bg-primary/10 text-secondary text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full border border-primary/5">
                      Secure Profile
                    </span>
                  </div>

                  <form onSubmit={handleSave} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6">
                      {/* Name */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                          <User className="w-3 h-3 text-primary" /> Full Name
                        </label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50/50 text-sm font-bold text-gray-900 outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/20 transition-all"
                          placeholder="Your full name"
                        />
                      </div>

                      {/* Email (Read-only) */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                          <Mail className="w-3 h-3 text-primary" /> Email Address
                          <span className="ml-auto text-[8px] bg-gray-100 px-2 py-0.5 rounded-full">Read-only</span>
                        </label>
                        <input
                          type="email"
                          value={session?.user?.email || ""}
                          disabled
                          className="w-full px-6 py-4 rounded-2xl border border-gray-50 bg-gray-50 text-sm font-bold text-gray-400 cursor-not-allowed"
                        />
                      </div>

                      {/* Phone */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                          <Phone className="w-3 h-3 text-primary" /> Phone Number
                        </label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50/50 text-sm font-bold text-gray-900 outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/20 transition-all"
                          placeholder="+880 1XXX-XXXXXX"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSaving}
                      className="w-full py-5 bg-secondary text-white rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-xl shadow-secondary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                      {isSaving ? "Synchronizing..." : "Edit Profile"}
                    </button>
                  </form>
               </div>

               {/* Efficiency Section (Preserved Data) */}
               <div className="bg-white border border-gray-100 rounded-[2.5rem] p-10 shadow-sm">
                  <h3 className="text-xl font-black text-gray-900 mb-8 flex items-center gap-3">
                    <TrendingUp className="text-primary w-6 h-6" />
                    Efficiency Audit
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <EfficiencyBar label="On-Time Rate" percent="98%" color="bg-emerald-500" />
                     <EfficiencyBar label="Parcel Safety" percent="100%" color="bg-blue-500" />
                  </div>
               </div>
            </div>

            {/* ── Right Column: Profile Summary Card ── */}
            <div className="space-y-6">
              <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm">
                <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-6">Profile Summary</p>

                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center text-xl font-black text-primary shrink-0 shadow-lg">
                    {session?.user?.image ? (
                      <img src={session.user.image} alt={name} className="w-full h-full object-cover rounded-2xl" />
                    ) : initial}
                  </div>
                  <div className="min-w-0">
                    <p className="font-black text-gray-900 text-base truncate">{name || "Rider Name"}</p>
                    <p className="text-[10px] font-bold text-gray-400 truncate mt-0.5">{session?.user?.email}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <SummaryRow icon={<ShieldCheck size={14}/>} label="Role" value="Active Rider" />
                  <SummaryRow icon={<CheckCircle2 size={14}/>} label="Status" value="Active" highlight />
                  <SummaryRow icon={<Phone size={14}/>} label="Phone" value={phone || "Not set"} />
                  <div className="pt-4 mt-4 border-t border-gray-50 space-y-3">
                     <SummaryRow icon={<Star size={14}/>} label="Rating" value="4.9 / 5.0" />
                     <SummaryRow icon={<Award size={14}/>} label="Tier" value="Elite Circle" />
                  </div>
                </div>
              </div>

              {/* Achievement Badges (Refined) */}
              <div className="bg-[#033C3F] rounded-[2.5rem] p-8 text-white shadow-2xl group">
                 <h4 className="text-sm font-black uppercase tracking-widest mb-6 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-primary" /> Achievements
                 </h4>
                 <div className="grid grid-cols-4 gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#C8FF65]">
                       <Award size={18} />
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-400">
                       <ShieldCheck size={18} />
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-orange-400">
                       <Clock size={18} />
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary">
                       <Truck size={18} />
                    </div>
                 </div>
              </div>

              {/* Pro Tip Card */}
              <div className="bg-secondary rounded-[2rem] p-8 text-white">
                <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-3">Operational Tip</p>
                <p className="text-white/60 text-xs leading-relaxed font-bold">
                  Maintain your Elite Tier status by completing at least 25 deliveries this month with zero safety incidents.
                </p>
              </div>
            </div>
          </div>
          
          {/* Recent Work Log (Preserved Section at bottom) */}
          <div className="bg-white border border-gray-100 rounded-[3rem] p-10 lg:p-14 shadow-sm">
             <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center">
                      <BarChart3 className="w-6 h-6 text-gray-900" />
                   </div>
                   <h3 className="text-2xl font-black text-gray-900 tracking-tight">Technical Work History</h3>
                </div>
             </div>
             <div className="space-y-5">
                {loading ? (
                  [1, 2, 3].map(i => <div key={i} className="h-20 bg-gray-50 rounded-[2rem] animate-pulse" />)
                ) : stats?.recentDeliveries?.length > 0 ? (
                  stats.recentDeliveries.slice(0, 5).map((log) => (
                    <div key={log._id} className="flex items-center justify-between p-6 bg-gray-50/50 rounded-[2rem] border border-transparent hover:border-gray-100 hover:bg-white hover:shadow-xl transition-all duration-500">
                       <div className="flex items-center gap-6">
                          <div className="p-3 bg-white rounded-xl shadow-sm">
                             <Package className="w-5 h-5 text-secondary" />
                          </div>
                          <div>
                             <p className="text-[10px] font-black text-gray-400 uppercase mb-1">To: {log.receiver?.district}</p>
                             <h4 className="text-sm font-black text-gray-900">#{log._id.slice(-8)}</h4>
                          </div>
                       </div>
                       <div className="text-right">
                          <p className="text-sm font-black text-emerald-600">+৳{log.deliveryCharge}</p>
                          <p className="text-[9px] font-black text-gray-400 uppercase mt-1">Verified Log</p>
                       </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center py-10 text-gray-400 font-bold italic">No work history logs available yet.</p>
                )}
             </div>
          </div>
        </div>
      </DashboardLayout>
    </RoleGuard>
  );
}

function EfficiencyBar({ label, percent, color }) {
  return (
    <div className="space-y-3">
       <div className="flex justify-between items-end">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</span>
          <span className="text-xs font-black text-gray-900">{percent}</span>
       </div>
       <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div className={`h-full rounded-full ${color}`} style={{ width: percent }} />
       </div>
    </div>
  );
}

function SummaryRow({ icon, label, value, highlight }) {
  return (
    <div className="flex items-center justify-between bg-gray-50/50 rounded-2xl px-5 py-4 border border-gray-50">
      <span className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
        <span className="text-primary">{icon}</span>{label}
      </span>
      <span className={`text-[10px] font-black truncate max-w-[140px] ${highlight ? "text-emerald-500" : "text-gray-900"}`}>
        {value}
      </span>
    </div>
  );
}
