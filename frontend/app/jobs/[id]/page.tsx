// frontend/app/jobs/[id]/page.tsx
import { ApplicationForm } from "@/components/application-form";

async function getJobDetails(id: string) {
  const res = await fetch(`http://localhost:5000/api/jobs/${id}`, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

export default async function JobDetailPage({ params }: { params: { id: string } }) {
  const job = await getJobDetails(params.id);

  if (!job) return <div>Job not found</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">{job.title}</h1>
      <p className="text-muted-foreground">{job.department} - {job.location}</p>
      <p className="mt-4">{job.description}</p>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Apply Now</h2>
        <ApplicationForm jobId={job.id} />
      </div>
    </div>
  );
}
