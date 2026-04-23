'use client';

import { useUser, useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import Loader from '@/components/Loader/Loader';
import { normalizeRole } from '@/utils/roleUtils';

/**
 * Higher-order component/wrapper to protect routes.
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {Array<string>} [props.allowedRoles] - List of roles that can access this route. If empty, any logged in user can access.
 */
export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const { isLoaded, user } = useUser();
  const { userId } = useAuth();
  const router = useRouter();

  // Helper to determine role from metadata or email fallback
  const userRole = useMemo(() => {
    if (!user) return 'user';
    if (user.publicMetadata?.role) return user.publicMetadata.role;
    const email = user.primaryEmailAddress?.emailAddress || '';
    if (email.toLowerCase().includes('admin')) return 'admin';
    return 'user';
  }, [user]);
  const loading = !isLoaded;

  const normalizedUserRole = normalizeRole(userRole);
  const allowedRolesDep = allowedRoles ? allowedRoles.join(',') : '';
  const normalizedAllowedRoles = useMemo(() => allowedRoles ? allowedRoles.map(normalizeRole) : [], [allowedRolesDep]);

  useEffect(() => {
    if (!loading) {
      if (!userId) {
        router.replace('/sign-in');
      } else if (normalizedAllowedRoles.length > 0 && normalizedUserRole && !normalizedAllowedRoles.includes(normalizedUserRole)) {
        if (normalizedUserRole === 'admin') router.replace('/dashboard/admin');
        else if (normalizedUserRole === 'rider') router.replace('/dashboard/rider');
        else router.replace('/dashboard/user');
      }
    }
  }, [userId, normalizedUserRole, loading, router, normalizedAllowedRoles]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader />
      </div>
    );
  }

  // Final authorization verification
  const isAuthorized = user && (normalizedAllowedRoles.length === 0 || (normalizedUserRole && normalizedAllowedRoles.includes(normalizedUserRole)));

  return isAuthorized ? <>{children}</> : null;
}
