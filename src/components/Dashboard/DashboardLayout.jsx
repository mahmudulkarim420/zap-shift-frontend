'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useMemo } from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { normalizeRole } from '@/utils/roleUtils';
import { useSession, signOut } from 'next-auth/react';
import { 
  Briefcase,
  LayoutDashboard, 
  Package, 
  Users, 
  Bike, 
  ShieldCheck, 
  BarChart3, 
  Truck, 
  DollarSign, 
  User, 
  PlusCircle, 
  Layers, 
  Search,
  LogOut,
  Menu,
  X
} from "lucide-react";

export default function DashboardLayout({ children }) {
  const { data: session, status } = useSession();
  const isLoaded = status !== "loading";
  const isSignedIn = status === "authenticated";
  const user = session?.user;
  
  const router = useRouter();
  const pathname = usePathname();
  
  // Role resolution from Next-Auth session
  const rawRole = user?.role || 'user';
  const normalizedUserRole = normalizeRole ? normalizeRole(rawRole) : rawRole;

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleSidebar = () => setCollapsed(!collapsed);
  const toggleMobile = () => setMobileOpen(!mobileOpen);

  return (
    <div className="h-screen flex overflow-hidden bg-[#f0f2f7]">

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static top-0 left-0 z-50 h-full overflow-y-auto flex flex-col
          transition-all duration-300 ease-in-out
          ${collapsed ? 'lg:w-[80px]' : 'lg:w-[260px]'}
          ${mobileOpen ? 'w-[280px] translate-x-0' : 'w-[280px] -translate-x-full lg:translate-x-0'}
        `}
        style={{
          background: '#033C3F',
          boxShadow: '4px 0 24px rgba(0,0,0,0.15)',
        }}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-6 py-7 border-b border-white/5">
          {(!collapsed || mobileOpen) && (
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shrink-0">
                <span className="text-secondary font-black text-lg italic">Z</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Zap<span className="text-primary">Shift</span>
              </span>
            </Link>
          )}

          {/* LG Toggle */}
          <button
            onClick={toggleSidebar}
            className={`hidden lg:flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 text-white/60 hover:text-[#C8FF65] hover:bg-white/10 transition-all ${collapsed ? 'rotate-180' : ''}`}
          >
            <IoIosArrowBack size={18} />
          </button>

          {/* Mobile Close */}
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-2 text-white/60 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* User Card */}
        {(!collapsed || mobileOpen) && (
          <div className="mx-4 mt-6 p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-base bg-[#C8FF65] text-[#033C3F] shrink-0 shadow-lg shadow-[#C8FF65]/10 overflow-hidden">
              {user?.image ? (
                <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                user?.name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U'
              )}
            </div>
            <div className="min-w-0">
              <p className="text-white text-sm font-bold truncate">
                {user?.name || 'User Account'}
              </p>
              <p className="text-[#C8FF65]/60 text-[10px] uppercase font-bold tracking-widest mt-0.5">
                {normalizedUserRole}
              </p>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-1.5 overflow-x-hidden">
          <p className={`px-4 text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] mb-3 transition-opacity duration-200 ${collapsed && !mobileOpen ? 'opacity-0' : 'opacity-100'}`}>
            Menu
          </p>
          <NavLink
            collapsed={collapsed && !mobileOpen}
            href={`/dashboard/${normalizedUserRole}`}
            icon={<LayoutDashboard className="w-5 h-5" />}
            active={pathname === `/dashboard/${normalizedUserRole}`}
          >
            Admin Overview
          </NavLink>

          {/* ── ADMIN NAV ── */}
          {normalizedUserRole === 'admin' && (
            <div className="pt-4 space-y-1.5">
              <p className={`px-4 text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] mb-3 transition-opacity duration-200 ${collapsed && !mobileOpen ? 'opacity-0' : 'opacity-100'}`}>
                Management
              </p>
              <NavLink collapsed={collapsed && !mobileOpen} href="/dashboard/admin/all-parcels" icon={<Package className="w-5 h-5" />} active={pathname === '/dashboard/admin/all-parcels'}>
                Parcel Inventory
              </NavLink>
              <NavLink collapsed={collapsed && !mobileOpen} href="/dashboard/admin/all-users" icon={<Users className="w-5 h-5" />} active={pathname === '/dashboard/admin/all-users'}>
                User Directory
              </NavLink>
              <NavLink collapsed={collapsed && !mobileOpen} href="/dashboard/admin/rider-management" icon={<Bike className="w-5 h-5" />} active={pathname === '/dashboard/admin/rider-management'}>
                Rider Management
              </NavLink>
              <NavLink collapsed={collapsed && !mobileOpen} href="/dashboard/admin/role-management" icon={<ShieldCheck className="w-5 h-5" />} active={pathname === '/dashboard/admin/role-management'}>
                Role Permissions
              </NavLink>
              <p className={`px-4 pt-3 text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] mb-3 transition-opacity duration-200 ${collapsed && !mobileOpen ? 'opacity-0' : 'opacity-100'}`}>
                Analytics
              </p>
              <NavLink collapsed={collapsed && !mobileOpen} href="/dashboard/admin/statistics" icon={<BarChart3 className="w-5 h-5" />} active={pathname === '/dashboard/admin/statistics'}>
                Financial Reports
              </NavLink>
            </div>
          )}

          {/* ── RIDER NAV ── */}
          {normalizedUserRole === 'rider' && (
            <div className="pt-4 space-y-1.5">
              <p className={`px-4 text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] mb-3 transition-opacity duration-200 ${collapsed && !mobileOpen ? 'opacity-0' : 'opacity-100'}`}>
                Delivery Ops
              </p>
              <NavLink collapsed={collapsed && !mobileOpen} href="/dashboard/rider/available-deliveries" icon={<Truck className="w-5 h-5" />} active={pathname === '/dashboard/rider/available-deliveries'}>
                Available Deliveries
              </NavLink>
              <NavLink collapsed={collapsed && !mobileOpen} href="/dashboard/rider/my-tasks" icon={<Layers className="w-5 h-5" />} active={pathname === '/dashboard/rider/my-tasks'}>
                My Active Tasks
              </NavLink>
              <NavLink collapsed={collapsed && !mobileOpen} href="/dashboard/rider/earnings" icon={<DollarSign className="w-5 h-5" />} active={pathname === '/dashboard/rider/earnings'}>
                My Earnings
              </NavLink>
              <NavLink collapsed={collapsed && !mobileOpen} href="/dashboard/rider/work-profile" icon={<Briefcase className="w-5 h-5" />} active={pathname === '/dashboard/rider/work-profile'}>
                Work Portfolio
              </NavLink>
              <NavLink collapsed={collapsed && !mobileOpen} href="/dashboard/rider/profile" icon={<User className="w-5 h-5" />} active={pathname === '/dashboard/rider/profile'}>
                Personal Profile
              </NavLink>
            </div>
          )}

          {/* ── USER NAV ── */}
          {normalizedUserRole === 'user' && (
            <div className="pt-4 space-y-1.5">
              <p className={`px-4 text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] mb-3 transition-opacity duration-200 ${collapsed && !mobileOpen ? 'opacity-0' : 'opacity-100'}`}>
                Shipments
              </p>
              <NavLink collapsed={collapsed && !mobileOpen} href="/dashboard/book-parcel" icon={<PlusCircle className="w-5 h-5" />} active={pathname === '/dashboard/book-parcel'}>
                Book a Parcel
              </NavLink>
              <NavLink collapsed={collapsed && !mobileOpen} href="/dashboard/my-orders" icon={<Layers className="w-5 h-5" />} active={pathname === '/dashboard/my-orders'}>
                My Orders
              </NavLink>
              <NavLink collapsed={collapsed && !mobileOpen} href="/dashboard/track-order" icon={<Search className="w-5 h-5" />} active={pathname === '/dashboard/track-order'}>
                Track Order
              </NavLink>
            </div>
          )}

          {/* ── ACCOUNT (All Roles) ── */}
          <div className="pt-4 space-y-1.5">
            <p className={`px-4 text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] mb-3 transition-opacity duration-200 ${collapsed && !mobileOpen ? 'opacity-0' : 'opacity-100'}`}>
              Account
            </p>
            <NavLink collapsed={collapsed && !mobileOpen} href="/profile" icon={<User className="w-5 h-5" />} active={pathname === '/profile'}>
              My Profile
            </NavLink>
          </div>
        </nav>

        {/* Sidebar Footer / Logout */}
        <div className="p-4 border-t border-white/5 bg-white/[0.02]">
          <button
            onClick={() => signOut({ callbackUrl: '/sign-in' })}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-400 hover:bg-red-500/10 transition-colors group ${collapsed && !mobileOpen ? 'justify-center px-0' : ''}`}
          >
            <LogOut className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            {(!collapsed || mobileOpen) && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">

        {/* Sticky Header */}
        <header className="sticky top-0 z-30 flex items-center justify-between px-6 lg:px-10 py-5 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">

          <div className="flex items-center gap-4">
            {/* Mobile Sidebar Toggle */}
            <button
              onClick={toggleMobile}
              className="lg:hidden p-2.5 rounded-xl bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>

            <div className="hidden sm:block">
              <h1 className="text-lg lg:text-xl font-black text-gray-900 tracking-tight leading-none">
                Hello, {user?.name?.split(' ')[0] || 'Member'}
              </h1>
              <p className="text-[11px] font-bold text-gray-400 mt-1 uppercase tracking-widest">
                Authenticated as <span className="text-[#033C3F]">{normalizedUserRole}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col items-end">
              <p className="text-xs font-bold text-gray-800">{user?.email}</p>
              <span className="px-2 py-0.5 rounded text-[9px] font-black bg-emerald-50 text-emerald-600 uppercase">System Active</span>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center text-primary font-black text-sm shadow-xl shadow-secondary/10 border border-secondary/10 overflow-hidden">
              {user?.image ? (
                <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                user?.name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U'
              )}
            </div>
          </div>
        </header>

        {/* Scrolling Viewport */}
        <div className="flex-1 overflow-y-auto bg-[#f8fafc] scrollbar-thin">
          <div className="p-6 lg:p-10 max-w-[1600px] mx-auto min-h-full">
            <div className="bg-white rounded-[2.5rem] p-6 lg:p-10 shadow-2xl shadow-gray-200/50 border border-gray-100/50 min-h-[500px] animate-in fade-in slide-in-from-bottom-4 duration-700">
              {children}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

/* NavLink Sub-component */
function NavLink({ href, icon, children, collapsed, active }) {
  return (
    <Link
      href={href}
      className={`
        flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-bold transition-all duration-300 group
        ${collapsed ? 'justify-center px-0' : 'hover:translate-x-1'}
        ${active 
          ? 'bg-primary text-secondary shadow-lg shadow-primary/10' 
          : 'text-white/50 hover:bg-white/5 hover:text-primary'}
      `}
    >
      <span className={`text-lg transition-transform group-hover:scale-110 ${active ? 'opacity-100' : 'opacity-80 group-hover:opacity-100'}`}>
        {icon}
      </span>
      {!collapsed && (
        <span className="whitespace-nowrap transition-opacity duration-300">
          {children}
        </span>
      )}
    </Link>
  );
}
