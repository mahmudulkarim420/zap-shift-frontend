'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Loader from '@/components/Loader/Loader';

/**
 * Higher-order component/wrapper to protect routes.
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {Array<string>} [props.allowedRoles] - List of roles that can access this route. If empty, any logged in user can access.
 */
export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const { user, userRole, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/login');
      } else if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
        router.push('/'); // Redirect to home if role is not authorized
      }
    }
  }, [user, userRole, loading, router, allowedRoles]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader />
      </div>
    );
  }

  // If we have a user and (no role requirement OR role matches)
  if (user && (allowedRoles.length === 0 || allowedRoles.includes(userRole))) {
    return <>{children}</>;
  }

  return null;
}
