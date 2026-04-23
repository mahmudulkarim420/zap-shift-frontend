'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { normalizeRole } from '@/utils/roleUtils';

const RoleGuard = ({ children, allowedRoles }) => {
  const { isLoaded, user } = useUser();
  const router = useRouter();

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
  const normalizedAllowedRoles = useMemo(() => allowedRoles ? allowedRoles.map(normalizeRole) : null, [allowedRolesDep]);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/sign-in');
      } else if (normalizedAllowedRoles && normalizedUserRole && !normalizedAllowedRoles.includes(normalizedUserRole)) {
        // Redirect to their own dashboard if they are lost
        if (normalizedUserRole === 'admin') router.push('/dashboard/admin');
        else if (normalizedUserRole === 'rider') router.push('/dashboard/rider');
        else router.push('/dashboard/user');
      }
    }
  }, [user, normalizedUserRole, loading, router, normalizedAllowedRoles]);

  if (loading || !user || (normalizedAllowedRoles && normalizedUserRole && !normalizedAllowedRoles.includes(normalizedUserRole))) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return children;
};

export default RoleGuard;
