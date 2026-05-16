"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import RoleGuard from "@/components/RoleGuard";
import { 
  Shield, 
  User, 
  Bike, 
  Crown, 
  Search, 
  RefreshCw,
  Loader2,
  ShieldCheck,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import Swal from "sweetalert2";

export default function ManageRole() {
  const { data: session } = useSession();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [stats, setStats] = useState({
    adminCount: 0,
    riderCount: 0,
    userCount: 0
  });

  const fetchData = useCallback(async () => {
    if (!session?.accessToken) return;
    const BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
    const headers = { Authorization: `Bearer ${session.accessToken}` };

    try {
      setLoading(true);
      const res = await axios.get(`${BASE}/admin/users`, { headers });
      if (res.data.success) {
        const allUsers = res.data.data || [];
        setUsers(allUsers);
        
        setStats({
          adminCount: allUsers.filter(u => u.role === 'admin').length,
          riderCount: allUsers.filter(u => u.role === 'rider').length,
          userCount: allUsers.filter(u => u.role === 'user').length
        });
      }
    } catch (err) {
      console.error("Failed to fetch users:", err);
      Swal.fire("Error", "Could not load user list.", "error");
    } finally {
      setLoading(false);
    }
  }, [session]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleUpdate = async (userId, updateData, userName) => {
    try {
      const headers = { Authorization: `Bearer ${session.accessToken}` };
      const BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
      
      const res = await axios.put(`${BASE}/admin/users/${userId}/role-status`, updateData, { headers });
      
      if (res.data.success) {
        Swal.fire({
          title: "Updated!",
          text: `${userName} has been updated successfully.`,
          icon: "success",
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true
        });
        
        // Dynamic state update without full re-fetch for better UX
        setUsers(prev => prev.map(u => u._id === userId ? { ...u, ...updateData } : u));
        
        // Update stats if role changed
        if (updateData.role) {
          const updatedUsers = users.map(u => u._id === userId ? { ...u, ...updateData } : u);
          setStats({
            adminCount: updatedUsers.filter(u => u.role === 'admin').length,
            riderCount: updatedUsers.filter(u => u.role === 'rider').length,
            userCount: updatedUsers.filter(u => u.role === 'user').length
          });
        }
      }
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message || "Failed to update user.", "error");
    }
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <RoleGuard allowedRoles={['admin']}>
      <DashboardLayout roleName="Admin">
        <div className="space-y-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">Role & Status Management</h1>
              <p className="mt-1 text-sm md:text-base text-gray-500">
                Grant permissions and moderate user accounts globally.
              </p>
            </div>

            <button 
              onClick={fetchData}
              className="w-fit flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>

          {/* Role Distribution Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="p-6 bg-blue-50/50 border border-blue-100 rounded-[2rem] shadow-sm backdrop-blur-md">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[10px] font-black text-blue-700 uppercase tracking-[0.2em]">Platform Users</p>
                  <h3 className="text-3xl font-black text-blue-950 mt-2">{loading ? <div className="h-8 w-12 bg-blue-200 animate-pulse rounded-lg" /> : stats.userCount}</h3>
                </div>
                <div className="bg-blue-100 p-3 rounded-2xl text-blue-700"><User className="w-5 h-5" /></div>
              </div>
            </div>

            <div className="p-6 bg-orange-50/50 border border-orange-100 rounded-[2rem] shadow-sm backdrop-blur-md">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[10px] font-black text-orange-700 uppercase tracking-[0.2em]">Rider Fleet</p>
                  <h3 className="text-3xl font-black text-orange-950 mt-2">{loading ? <div className="h-8 w-12 bg-orange-200 animate-pulse rounded-lg" /> : stats.riderCount}</h3>
                </div>
                <div className="bg-orange-100 p-3 rounded-2xl text-orange-700"><Bike className="w-5 h-5" /></div>
              </div>
            </div>

            <div className="p-6 bg-violet-50/50 border border-violet-100 rounded-[2rem] shadow-sm backdrop-blur-md">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[10px] font-black text-violet-700 uppercase tracking-[0.2em]">Administrators</p>
                  <h3 className="text-3xl font-black text-violet-950 mt-2">{loading ? <div className="h-8 w-12 bg-violet-200 animate-pulse rounded-lg" /> : stats.adminCount}</h3>
                </div>
                <div className="bg-violet-100 p-3 rounded-2xl text-violet-700"><ShieldCheck className="w-5 h-5" /></div>
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-xl p-6 lg:p-8 rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-gray-200/50">
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-black text-gray-900 tracking-tight">Access Control Directory</h2>
                <p className="text-sm text-gray-500 mt-1">Updates to role or status take effect immediately.</p>
              </div>

              <div className="flex items-center gap-3 px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl w-full md:w-80">
                <Search className="w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Filter by name or email..."
                  className="bg-transparent outline-none text-sm text-gray-700 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="overflow-x-auto rounded-3xl border border-gray-50">
              <table className="min-w-full">
                <thead className="bg-gray-50/50 text-[10px] font-black uppercase tracking-widest text-gray-400">
                  <tr>
                    <th className="px-8 py-5 text-left">Member Information</th>
                    <th className="px-8 py-5 text-left">Account Role</th>
                    <th className="px-8 py-5 text-left">System Status</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-50 text-sm">
                  {loading ? (
                    [...Array(5)].map((_, i) => (
                      <tr key={i} className="animate-pulse">
                        <td className="px-8 py-6"><div className="h-10 bg-gray-100 rounded-xl w-48" /></td>
                        <td className="px-8 py-6"><div className="h-10 bg-gray-100 rounded-xl w-32" /></td>
                        <td className="px-8 py-6"><div className="h-10 bg-gray-100 rounded-xl w-32" /></td>
                      </tr>
                    ))
                  ) : filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <tr key={user._id} className="hover:bg-gray-50/50 transition-colors group">
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center text-primary font-black shadow-lg shadow-secondary/10">
                              {user.name.charAt(0)}
                            </div>
                            <div className="flex flex-col">
                              <span className="font-bold text-gray-900 group-hover:text-primary transition-colors">{user.name}</span>
                              <span className="text-xs text-gray-400 font-medium">{user.email}</span>
                            </div>
                          </div>
                        </td>

                        <td className="px-8 py-6">
                          <select 
                            className={`px-4 py-2 rounded-xl text-xs font-bold border-none outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer transition-all
                              ${user.role === 'admin' ? 'bg-violet-50 text-violet-700' : 
                                user.role === 'rider' ? 'bg-orange-50 text-orange-700' : 
                                'bg-blue-50 text-blue-700'}`}
                            value={user.role}
                            onChange={(e) => handleUpdate(user._id, { role: e.target.value }, user.name)}
                          >
                            <option value="user">Platform User</option>
                            <option value="rider">Fleet Rider</option>
                            <option value="admin">Administrator</option>
                          </select>
                        </td>

                        <td className="px-8 py-6">
                          <div className="flex items-center gap-3">
                             <select 
                              className={`px-4 py-2 rounded-xl text-xs font-bold border-none outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer transition-all
                                ${user.status === 'active' ? 'bg-emerald-50 text-emerald-700' : 
                                  user.status === 'suspended' ? 'bg-red-50 text-red-700' : 
                                  'bg-amber-50 text-amber-700'}`}
                              value={user.status}
                              onChange={(e) => handleUpdate(user._id, { status: e.target.value }, user.name)}
                            >
                              <option value="active">Active</option>
                              <option value="suspended">Suspended</option>
                              <option value="pending">Pending</option>
                            </select>
                            {user.status === 'active' ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <AlertCircle className="w-4 h-4 text-red-400" />}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan="3" className="px-8 py-10 text-center text-gray-400 font-medium italic">No members match your search.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </RoleGuard>
  );
}
