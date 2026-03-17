'use client';

import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function DashboardLayout({ children, roleName }) {
  const { user, userRole, logout } = useAuth();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex-shrink-0">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-gray-800">ZapShift</h2>
          <span className="text-xs font-semibold text-primary uppercase tracking-wider">
            {roleName} Dashboard
          </span>
        </div>
        
        <nav className="p-4 space-y-2">
          <Link href={`/dashboard/${userRole}`} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition">
            Overview
          </Link>
          <Link href="/services" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition">
            Services
          </Link>
          <button 
            onClick={() => { logout(); router.push('/login'); }}
            className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col p-10 overflow-auto">
        <header className="flex justify-between items-center mb-8 bg-white p-6 rounded-2xl shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Welcome, {user?.name || 'User'}!</h1>
            <p className="text-gray-500 font-medium">You are logged in as a {userRole}.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-extrabold text-secondary tracking-tight">{user?.email}</p>
              <p className="text-[10px] font-bold text-primary uppercase tracking-widest">{userRole}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center font-extrabold text-lg shadow-lg shadow-primary/20">
              {user?.name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>
        
        <section className="bg-white p-8 rounded-2xl shadow-sm min-h-[400px]">
          {children}
        </section>
      </main>
    </div>
  );
}
