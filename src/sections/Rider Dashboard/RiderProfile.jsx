"use client";

import React, { cloneElement } from "react";
import { useSession } from "next-auth/react";
import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import RoleGuard from "@/components/RoleGuard";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  CreditCard, 
  Briefcase, 
  ShieldCheck,
  Star,
  Zap,
  Edit3,
  LogOut,
  Warehouse,
  Award,
  Settings,
  Bell,
  Cpu,
  Verified
} from "lucide-react";

export default function RiderProfile() {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <RoleGuard allowedRoles={['rider']}>
      <DashboardLayout roleName="Rider">
        <div className="max-w-6xl mx-auto space-y-12 pb-20">
          
          {/* Advanced Profile Header */}
          <div className="relative group">
            {/* The Cover Image Section */}
            <div className="h-40 md:h-52 bg-[#033C3F] rounded-[3.5rem] overflow-hidden shadow-2xl relative">
               {/* Pattern Overlay */}
               <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]" />
               <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />
               <div className="absolute top-8 right-8 flex gap-3">
                  <button className="p-2.5 bg-white/10 backdrop-blur-md rounded-xl text-white hover:bg-white/20 transition-all border border-white/10 shadow-xl">
                    <Settings className="w-4 h-4" />
                  </button>
                  <button className="p-2.5 bg-white/10 backdrop-blur-md rounded-xl text-white hover:bg-white/20 transition-all border border-white/10 shadow-xl">
                    <Bell className="w-4 h-4" />
                  </button>
               </div>
            </div>
            
            {/* Float Profile Card */}
            <div className="px-8 md:px-16 -mt-20 relative z-10 flex flex-col md:flex-row items-end gap-8">
              <div className="relative group/avatar">
                <div className="w-36 h-36 md:w-44 md:h-44 rounded-[3rem] bg-white p-2.5 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.15)]">
                  <div className="w-full h-full rounded-[2.5rem] bg-secondary flex items-center justify-center text-primary font-black text-4xl overflow-hidden border-4 border-gray-50/50 relative">
                    {user?.image ? (
                      <img src={user.image} alt={user.name} className="w-full h-full object-cover group-hover/avatar:scale-110 transition-transform duration-700" />
                    ) : (
                      user?.name?.charAt(0)?.toUpperCase() || 'R'
                    )}
                    {/* Live Indicator */}
                    <div className="absolute bottom-3 right-3 w-4 h-4 bg-emerald-500 rounded-full border-4 border-white animate-pulse" />
                  </div>
                </div>
              </div>

              <div className="mb-6 flex-1">
                <div className="flex flex-wrap items-center gap-4 mb-3">
                  <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight leading-none">
                    {user?.name}
                  </h1>
                  <span className="px-4 py-1.5 bg-secondary text-primary rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-secondary/20 border border-secondary/10">
                    Elite Tier
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-6 text-gray-400 font-bold text-sm">
                   <div className="flex items-center gap-2">
                      <Verified className="w-4 h-4 text-emerald-500" />
                      <span>Verified Rider</span>
                   </div>
                   <div className="w-1 h-1 bg-gray-300 rounded-full" />
                   <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{user?.warehouseId ? "Assigned: Central Hub" : "Fleet: All Regions"}</span>
                   </div>
                </div>
              </div>

              <div className="mb-6 hidden lg:flex items-center gap-3">
                 <button className="flex items-center gap-3 bg-[#033C3F] text-white px-8 py-4 rounded-[2rem] text-xs font-black uppercase tracking-widest shadow-2xl shadow-[#033C3F]/20 hover:translate-y-[-2px] active:translate-y-[0px] transition-all">
                    <Edit3 className="w-4 h-4 text-[#C8FF65]" />
                    Edit Portfolio
                 </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left Side: Stats & ID Card */}
            <div className="lg:col-span-4 space-y-8">
              
              {/* Digital ID Card */}
              <div className="bg-white border border-gray-100 rounded-[3rem] p-8 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-40 h-40 bg-secondary/5 rounded-full -mr-20 -mt-20 blur-3xl" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-8">
                    <Cpu className="w-5 h-5 text-secondary" />
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">System Identity</span>
                  </div>
                  
                  <div className="space-y-6">
                     <IDRow label="Rider ID" value={`ZS-R-${user?.id?.slice(-6) || "X92K11"}`} />
                     <IDRow label="NID Status" value={user?.nid ? "Authenticated" : "Pending Verification"} />
                     <IDRow label="Joined" value="Oct 2024" />
                     <div className="pt-4 mt-4 border-t border-gray-50 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                           <Award className="w-4 h-4 text-secondary" />
                           <span className="text-xs font-black text-gray-900">Top 5% Performer</span>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
                           <ShieldCheck size={18} />
                        </div>
                     </div>
                  </div>
                </div>
              </div>

              {/* Quick Performance Summary */}
              <div className="bg-[#C8FF65] rounded-[3rem] p-8 lg:p-10 shadow-xl shadow-[#C8FF65]/10 group relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-125 transition-transform duration-700">
                    <Star size={120} className="fill-[#033C3F]" />
                 </div>
                 <div className="relative z-10">
                    <p className="text-[#033C3F]/60 text-[10px] font-black uppercase tracking-widest mb-2">Driver Score</p>
                    <h3 className="text-6xl font-black text-[#033C3F] tracking-tight">4.9</h3>
                    <div className="mt-6 flex items-center gap-1">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-[#033C3F] fill-[#033C3F]" />)}
                    </div>
                    <p className="mt-8 text-xs font-bold text-[#033C3F]/70 leading-relaxed">
                      You are in the <span className="font-black">Elite Circle</span>. Your rating is higher than 94% of riders in your region.
                    </p>
                 </div>
              </div>
            </div>

            {/* Right Side: Detailed Info & Guidelines */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Detailed Specs */}
              <div className="bg-white border border-gray-100 rounded-[3.5rem] p-10 lg:p-14 shadow-sm">
                <div className="flex items-center gap-4 mb-12">
                   <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center">
                      <Briefcase className="w-6 h-6 text-gray-900" />
                   </div>
                   <div>
                      <h3 className="text-2xl font-black text-gray-900 tracking-tight">Professional Specs</h3>
                      <p className="text-sm font-medium text-gray-400">Manage your employment and identity data</p>
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-12">
                  <InfoItem icon={<Mail />} label="Secure Email" value={user?.email} />
                  <InfoItem icon={<Phone />} label="Verified Phone" value={user?.phone || "+880 1XXX-XXXXXX"} />
                  <InfoItem icon={<Calendar />} label="Age Group" value={`${user?.age || "N/A"} Years Professional`} />
                  <InfoItem icon={<CreditCard />} label="NID / Identification" value={user?.nid || "ENC-XXXXXXXX"} />
                  <InfoItem icon={<Warehouse />} label="Primary Dispatch Hub" value={user?.warehouseId ? "Assigned Hub" : "Regional Fleet"} />
                  <InfoItem icon={<ShieldCheck />} label="Employment" value="Verified Full-Time" />
                </div>
              </div>

              {/* Guidelines Section */}
              <div className="bg-[#033C3F] rounded-[3.5rem] p-10 lg:p-14 text-white shadow-2xl relative overflow-hidden group">
                 <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')]" />
                 <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-10">
                       <div className="w-12 h-12 bg-[#C8FF65] rounded-2xl flex items-center justify-center">
                          <Zap className="w-6 h-6 text-[#033C3F]" />
                       </div>
                       <h3 className="text-2xl font-black tracking-tight">Operational Protocol</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <ProtocolItem text="Elite tier riders must wear official safety gear at all times." />
                       <ProtocolItem text="Real-time tracking updates are mandatory for every phase." />
                       <ProtocolItem text="Fragile parcels require immediate white-glove handling." />
                       <ProtocolItem text="Bonuses are calculated based on monthly rating consistency." />
                    </div>
                 </div>
              </div>
            </div>

          </div>
        </div>
      </DashboardLayout>
    </RoleGuard>
  );
}

function IDRow({ label, value }) {
  return (
    <div className="flex items-center justify-between">
       <span className="text-xs font-bold text-gray-400">{label}</span>
       <span className="text-xs font-black text-gray-900">{value}</span>
    </div>
  );
}

function InfoItem({ icon, label, value }) {
  return (
    <div className="flex items-start gap-5 group/item">
      <div className="p-4 bg-gray-50 rounded-[1.5rem] text-gray-400 group-hover/item:bg-primary group-hover/item:text-secondary transition-all duration-300 shadow-sm">
        {icon && cloneElement(icon, { size: 20 })}
      </div>
      <div>
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1.5">{label}</p>
        <p className="text-base font-black text-gray-950 group-hover/item:text-secondary transition-colors">{value}</p>
      </div>
    </div>
  );
}

function ProtocolItem({ text }) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all cursor-default">
      <div className="w-2 h-2 bg-[#C8FF65] rounded-full mt-1.5 shadow-[0_0_12px_rgba(200,255,101,0.5)]" />
      <p className="text-xs font-bold text-white/80 leading-relaxed">{text}</p>
    </div>
  );
}
