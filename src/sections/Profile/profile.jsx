'use client';

import RoleGuard from "@/components/RoleGuard";
import { useAuth } from "@/hooks/useAuth";

const roleConfig = {
    admin: {
        label: "Root Administrator",
        badgeClass: "bg-primary/15 text-secondary border-primary/30",
        headerClass: "bg-secondary",
        accentClass: "bg-primary/5 border-primary/20",
        accentText: "text-primary",
        statsColor: "text-primary",
        access: "Full system access — manage users, riders, parcels and platform settings.",
    },
    rider: {
        label: "Active Rider",
        badgeClass: "bg-blue-50 text-blue-700 border-blue-200",
        headerClass: "bg-secondary",
        accentClass: "bg-blue-50 border-blue-100",
        accentText: "text-blue-600",
        statsColor: "text-blue-600",
        access: "View your delivery queue, update delivery status, and track your daily earnings.",
    },
    user: {
        label: "Standard User",
        badgeClass: "bg-gray-100 text-secondary border-gray-200",
        headerClass: "bg-secondary",
        accentClass: "bg-gray-50 border-gray-100",
        accentText: "text-secondary",
        statsColor: "text-secondary",
        access: "Track parcels, manage shipments, and view your delivery history.",
    },
};

const riderStats = [
    { label: "Deliveries", value: "142" },
    { label: "Avg. Rating", value: "4.9★" },
    { label: "Rank", value: "Gold" },
];

export default function DynamicProfile() {
    const { user, userRole } = useAuth();
    const role = roleConfig[userRole] ?? roleConfig.user;
    const initial = user?.name?.charAt(0)?.toUpperCase()
        || user?.email?.charAt(0)?.toUpperCase()
        || "U";

    return (
        <RoleGuard allowedRoles={["user", "admin", "rider"]}>
            <main className="min-h-screen py-10 sm:py-14">
                <div className="w-full mx-auto">
                    <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden">

                        {/* ── Header Band ── */}
                        <div className={`${role.headerClass} px-6 sm:px-10 lg:px-14 py-10 sm:py-12 lg:py-14 relative overflow-hidden`}>
                            {/* Subtle radial highlight */}
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.07),transparent_60%)] pointer-events-none" />

                            <div className="relative flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">

                                {/* Avatar + name */}
                                <div className="flex items-center gap-5">
                                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-primary/20 border-2 border-primary/40
                                  flex items-center justify-center text-2xl sm:text-3xl font-black text-primary
                                  shadow-lg shrink-0">
                                        {initial}
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">
                                            Account Overview
                                        </p>
                                        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-snug">
                                            {user?.name || "Your Profile"}
                                        </h1>
                                        <p className="text-white/50 text-xs sm:text-sm mt-1">
                                            {user?.email || "No email on record"}
                                        </p>
                                    </div>
                                </div>

                                {/* Role badge */}
                                <span className={`self-start sm:self-auto inline-flex items-center border
                                  px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest
                                  bg-white/95 ${role.badgeClass}`}>
                                    {role.label}
                                </span>
                            </div>
                        </div>

                        {/* ── Body ── */}
                        <div className="grid lg:grid-cols-[1fr_320px] gap-6 p-6 sm:p-8 lg:p-10">

                            {/* ── Left Column ── */}
                            <div className="space-y-6">

                                {/* Account Details */}
                                <div className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-7 shadow-sm">
                                    <div className="flex items-center justify-between mb-6">
                                        <div>
                                            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">
                                                Personal Info
                                            </p>
                                            <h2 className="text-xl sm:text-2xl font-bold text-secondary">
                                                Account Details
                                            </h2>
                                        </div>
                                        <span className="hidden sm:inline-flex bg-primary/10 text-secondary text-xs
                                     font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                                            Secure Profile
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {[
                                            { label: "Full Name", value: user?.name || "Not Provided" },
                                            { label: "Email Address", value: user?.email || "Not Provided" },
                                            { label: "Account Status", value: null, isStatus: true },
                                            { label: "Member Since", value: "March 2024" },
                                        ].map((item, i) => (
                                            <div
                                                key={i}
                                                className="bg-gray-50 border border-gray-100 rounded-xl p-4 sm:p-5
                                   hover:border-primary/20 transition-colors duration-200"
                                            >
                                                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">
                                                    {item.label}
                                                </p>
                                                {item.isStatus ? (
                                                    <div className="flex items-center gap-2">
                                                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                                        <span className="text-base font-bold text-green-600">Verified</span>
                                                    </div>
                                                ) : (
                                                    <p className="text-base font-bold text-secondary break-all">{item.value}</p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Rider Stats — conditional */}
                                {userRole === "rider" && (
                                    <div className="bg-secondary rounded-2xl p-6 sm:p-7">
                                        <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">
                                            Rider Performance
                                        </p>
                                        <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">
                                            Delivery Insights
                                        </h2>
                                        <div className="grid grid-cols-3 gap-4">
                                            {riderStats.map(stat => (
                                                <div
                                                    key={stat.label}
                                                    className="bg-white/5 border border-white/10 rounded-xl p-4 text-center"
                                                >
                                                    <p className="text-xs text-white/40 uppercase tracking-wide mb-2">
                                                        {stat.label}
                                                    </p>
                                                    <p className="text-2xl sm:text-3xl font-extrabold text-primary leading-none">
                                                        {stat.value}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Role Access */}
                                <div className={`border rounded-2xl p-6 sm:p-7 ${role.accentClass}`}>
                                    <p className={`text-xs font-semibold uppercase tracking-widest mb-1 ${role.accentText}`}>
                                        Role Access
                                    </p>
                                    <h3 className="text-lg sm:text-xl font-bold text-secondary mb-3">
                                        {role.label}
                                    </h3>
                                    <p className="text-sm text-gray-500 leading-relaxed">
                                        {role.access}
                                    </p>
                                </div>
                            </div>

                            {/* ── Right Column ── */}
                            <div className="space-y-5">

                                {/* Profile Summary */}
                                <div className="bg-white border border-gray-100 rounded-2xl p-5 sm:p-6 shadow-sm">
                                    <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
                                        Profile Summary
                                    </p>

                                    <div className="flex items-center gap-3 mb-5">
                                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center
                                    text-xl font-black text-secondary shrink-0">
                                            {initial}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="font-bold text-secondary text-sm truncate">
                                                {user?.name || "Unknown User"}
                                            </p>
                                            <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        {[
                                            { label: "Role", value: role.label, highlight: false },
                                            { label: "Status", value: "Active", highlight: true },
                                            { label: "Security", value: "Protected", highlight: false },
                                        ].map(row => (
                                            <div
                                                key={row.label}
                                                className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3"
                                            >
                                                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                                                    {row.label}
                                                </span>
                                                <span className={`text-xs font-bold ${row.highlight ? 'text-green-600' : 'text-secondary'}`}>
                                                    {row.value}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Quick Actions */}
                                <div className="bg-white border border-gray-100 rounded-2xl p-5 sm:p-6 shadow-sm">
                                    <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">
                                        Quick Actions
                                    </p>
                                    <h3 className="text-lg font-bold text-secondary mb-5">
                                        Manage Account
                                    </h3>

                                    <div className="flex flex-col gap-3">
                                        <button
                                            className="w-full bg-primary text-black font-semibold text-sm
                                 py-3 rounded-full hover:brightness-105 active:scale-95
                                 transition-all duration-200 shadow"
                                        >
                                            Update Profile
                                        </button>
                                        <button
                                            className="w-full border border-gray-200 text-secondary font-semibold text-sm
                                 py-3 rounded-full hover:border-secondary hover:bg-gray-50
                                 active:scale-95 transition-all duration-200"
                                        >
                                            Security Settings
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </RoleGuard>
    );
}