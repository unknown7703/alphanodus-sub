'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const token = localStorage.getItem('adminToken');
      if (!token && pathname !== '/admin/login') {
        router.push('/admin/login');
      }
    }
  }, [isClient, pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin/login');
  };
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }
  
  if (!isClient) {
    return null;
  }

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-100 p-4 border-r">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav className="flex flex-col space-y-2">
          <Button variant={pathname === '/admin' ? 'default' : 'ghost'} asChild>
            <Link href="/admin">Dashboard</Link>
          </Button>
          <Button variant={pathname === '/admin/create-job' ? 'default' : 'ghost'} asChild>
            <Link href="/admin/create-job">Create Job</Link>
          </Button>
          <Button variant={pathname === '/admin/applications' ? 'default' : 'ghost'} asChild>
            <Link href="/admin/applications">Applications</Link>
          </Button>
        </nav>
        <div className="mt-auto pt-4">
           <Button variant="outline" className="w-full" onClick={handleLogout}>
              Logout
           </Button>
        </div>
      </aside>
      <main className="flex-1 p-6 bg-gray-50">{children}</main>
    </div>
  );
}
