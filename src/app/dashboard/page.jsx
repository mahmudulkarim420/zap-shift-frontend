'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Loader from '@/components/Loader/Loader';

export default function DashboardRedirect() {
  const { isLoaded, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded) {
      if (!user) {
        router.replace('/sign-in');
        return;
      }

      // Determine role with fallback
      const userRole = user.publicMetadata?.role || 
                       (user.primaryEmailAddress?.emailAddress?.toLowerCase().includes('admin') ? 'admin' : 'user');
      
      const role = userRole.toLowerCase();

      if (role === 'admin') {
        router.replace('/dashboard/admin');
      } else if (role === 'rider') {
        router.replace('/dashboard/rider');
      } else {
        router.replace('/dashboard/user');
      }
    }
  }, [isLoaded, user, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Loader />
    </div>
  );
}
