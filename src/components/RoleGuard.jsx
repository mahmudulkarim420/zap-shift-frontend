'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const RoleGuard = ({ children, allowedRoles }) => {
  const { user, userRole, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/login');
      } else if (allowedRoles && !allowedRoles.includes(userRole)) {
        // Redirect to their own dashboard if they are lost
        if (userRole === 'admin') router.push('/dashboard/admin');
        else if (userRole === 'rider') router.push('/dashboard/rider');
        else router.push('/dashboard/user');
      }
    }
  }, [user, userRole, loading, router, allowedRoles]);

  if (loading || !user || (allowedRoles && !allowedRoles.includes(userRole))) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return children;
};

export default RoleGuard;
