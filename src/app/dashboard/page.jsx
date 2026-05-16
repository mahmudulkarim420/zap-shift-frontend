'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Loader from '@/components/Loader/Loader';
import { normalizeRole } from '@/utils/roleUtils';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;

    if (status === 'unauthenticated') {
      router.replace('/sign-in');
      return;
    }

    if (status === 'authenticated') {
      const role = normalizeRole(session?.user?.role);
      const roleRoutes = {
        admin: '/dashboard/admin',
        rider: '/dashboard/rider',
        user: '/dashboard/user',
      };
      router.replace(roleRoutes[role] || '/dashboard/user');
    }
  }, [status, session, router]);

  // Always show loader while redirecting
  return <Loader />;
}
