'use client';

import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function DashboardLayout({ children, roleName }) {
  const { user, userRole, logout } = useAuth();
  const router = useRouter();

  return (
    <div className="min-h-screen flex" style={{ background: '#f0f2f7', fontFamily: "'DM Sans', sans-serif" }}>

      {/* Sidebar */}
      <aside className="w-60 flex-shrink-0 flex flex-col" style={{
        background: '#033C3F',
        boxShadow: '4px 0 24px rgba(0,0,0,0.18)'
      }}>

        {/* Logo */}
        <div className="px-7 pt-8 pb-6 border-b border-white/10">
          <Link href="/" className="block">
            <span className="text-2xl font-black tracking-tight" style={{
              color: '#C8FF65'
            }}>
              ZapShift
            </span>
            <span className="block mt-1 text-[10px] font-semibold tracking-[0.2em] uppercase text-white/30">
              Dashboard
            </span>
          </Link>
        </div>

        {/* User Card */}
        <div className="mx-4 mt-5 mb-2 p-3 rounded-xl flex items-center gap-3" style={{
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.08)'
        }}>
          <div className="w-9 h-9 rounded-lg flex items-center justify-center font-black text-sm flex-shrink-0"
            style={{ background: '#C8FF65', color: '#033C3F' }}>
            {user?.name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="text-white text-xs font-semibold truncate">{user?.name || 'User'}</p>
            <p className="text-white/40 text-[10px] uppercase tracking-widest font-medium">{userRole}</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          <p className="px-4 text-[9px] uppercase tracking-[0.18em] text-white/25 font-semibold mb-2">Navigation</p>

          <NavLink href={`/dashboard/${userRole}`} icon="⊞">
            Overview
          </NavLink>

          {userRole === 'admin' && (
            <>
              <p className="px-4 pt-4 pb-1 text-[9px] uppercase tracking-[0.18em] text-white/25 font-semibold">Admin</p>
              <NavLink href="/dashboard/admin/users" icon="👥">Manage Users</NavLink>
              <NavLink href="/dashboard/admin/parcels" icon="📦">All Parcels</NavLink>
              <NavLink href="/dashboard/admin/riders" icon="🛵">Manage Riders</NavLink>
              <NavLink href="/dashboard/admin/role" icon="✦">Manage Role</NavLink>
            </>
          )}

          {userRole !== 'admin' && (
            <NavLink href="/services" icon="✦">Services</NavLink>
          )}
        </nav>

        {/* Logout */}
        <div className="px-3 pb-6">
          <button
            onClick={() => { logout(); router.push('/login'); }}
            className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
            style={{ color: '#f87171', background: 'rgba(248,113,113,0.08)' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(248,113,113,0.16)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(248,113,113,0.08)'}
          >
            <span>↩</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col overflow-auto">

        {/* Top Header Bar */}
        <header className="sticky top-0 z-10 flex items-center justify-between px-8 py-4"
          style={{
            background: 'rgba(240,242,247,0.85)',
            backdropFilter: 'blur(16px)',
            borderBottom: '1px solid rgba(0,0,0,0.06)'
          }}>
          <div>
            <h1 className="text-lg font-black text-gray-900 tracking-tight leading-none">
              Welcome back, {user?.name?.split(' ')[0] || 'User'} 👋
            </h1>
            <p className="text-xs text-gray-400 font-medium mt-0.5">
              Logged in as <span className="font-semibold text-gray-500 capitalize">{userRole}</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-gray-700">{user?.email}</p>
              <p className="text-[10px] uppercase tracking-widest font-semibold" style={{ color: '#033C3F' }}>{userRole}</p>
            </div>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-base shadow-md"
              style={{ background: '#C8FF65', color: '#033C3F' }}>
              {user?.name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-8">
          <div className="rounded-2xl overflow-hidden"
            style={{
              background: '#fff',
              boxShadow: '0 2px 20px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04)',
              minHeight: '400px'
            }}>
            <div className="p-8">
              {children}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Helper sub-component for nav links
function NavLink({ href, icon, children }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 group"
      style={{ color: 'rgba(255,255,255,0.55)' }}
      onMouseEnter={e => {
        e.currentTarget.style.background = 'rgba(200, 255, 101, 0.1)';
        e.currentTarget.style.color = '#C8FF65';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'transparent';
        e.currentTarget.style.color = 'rgba(255,255,255,0.55)';
      }}
    >
      <span className="text-base leading-none">{icon}</span>
      <span>{children}</span>
    </Link>
  );
}