// frontend/components/job-card.tsx
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function JobCard({ job }: { job: any }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{job.title}</CardTitle>
        <CardDescription>{job.department} - {job.location}</CardDescription>
      </CardHeader>
      <CardContent>
        <Link href={`/jobs/${job.id}`}>
          <Button>View Details</Button>
        </Link>
      </CardContent>
    </Card>
  );
}
