// frontend/app/page.tsx
import { JobCard } from '@/components/job-card';
import { Card } from '@/components/ui/card';

async function getJobs() {
  const res = await fetch('http://localhost:5000/api/jobs', { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch jobs');
  return res.json();
}

export default async function HomePage() {
  const jobs = await getJobs();

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Open Positions</h1>
      <div className="space-y-4">
        {jobs.map((job: any) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </main>
  );
}
