// frontend/app/admin/applications/page.tsx
'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';

import {
  Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Application {
  id: number;
  full_name: string;
  email: string;
  job_title: string;
  status: 'pending' | 'accepted' | 'rejected';
}

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  

  const fetchApplications = async () => {
    try {
      const response = await api.get('/admin/applications');
      setApplications(response.data);
    } catch (error) {
      alert("error")
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleStatusUpdate = async (id: number, status: 'accepted' | 'rejected') => {
    try {
      await api.put(`/admin/applications/${id}/status`, { status });
      
      fetchApplications(); // Refresh the list
    } catch (error) {
      alert("error")
    }
  };

  if (isLoading) return <div>Loading applications...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Job Applications</h1>
      <Table>
        <TableCaption>A list of all submitted job applications.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Applicant</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Job Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((app) => (
            <TableRow key={app.id}>
              <TableCell className="font-medium">{app.full_name}</TableCell>
              <TableCell>{app.email}</TableCell>
              <TableCell>{app.job_title}</TableCell>
              <TableCell>
                 <Badge variant={app.status === 'accepted' ? 'default' : app.status === 'rejected' ? 'destructive' : 'secondary'}>
                    {app.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Button size="sm" onClick={() => handleStatusUpdate(app.id, 'accepted')} disabled={app.status !== 'pending'}>Accept</Button>
                <Button variant="destructive" size="sm" onClick={() => handleStatusUpdate(app.id, 'rejected')} disabled={app.status !== 'pending'}>Reject</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
