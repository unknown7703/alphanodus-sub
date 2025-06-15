// frontend/app/page.tsx
import { JobCard } from '@/components/job-card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Search, TrendingUp, Users, Award } from 'lucide-react';
import { Navbar } from '@/components/navbar';
interface Job {
  id: number;
  title: string;
  department: string;
  location: string;
  description: string;
  posting_date: string;
}

async function getJobs(): Promise<Job[]> {
  try {
    const res = await fetch('http://localhost:5000/api/jobs', { cache: 'no-store' });
    if (!res.ok) {
      console.error('Failed to fetch jobs:', res.statusText);
      return [];
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }
}

export default async function HomePage() {
  const jobs = await getJobs();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar/>
      <section className="py-20 md:py-28 bg-white border-b">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-4 inline-flex items-center text-sm text-blue-600 font-medium bg-blue-100 px-3 py-1 rounded-full">
            <TrendingUp className="w-4 h-4 mr-2" />
            Join thousands of professionals finding their dream jobs
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Find Your Next <br />
            <span className="text-blue-600">Opportunity</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
            Discover roles that match your passion and expertise at top companies.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-blue-600 text-white hover:bg-blue-700 font-semibold px-6 py-3 rounded-md transition-all duration-200" asChild>
              <Link href="#jobs">
                <Search className="w-5 h-5 mr-2" />
                Browse Openings
              </Link>
            </Button>
            
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-md">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-semibold">{jobs.length}+</h3>
              <p className="text-gray-600">Active Job Listings</p>
            </div>
            <div className="space-y-2">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-600 text-white rounded-md">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-semibold">500+</h3>
              <p className="text-gray-600">Companies Hiring</p>
            </div>
            <div className="space-y-2">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-600 text-white rounded-md">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-semibold">95%</h3>
              <p className="text-gray-600">Success Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Job Listings Section */}
      <main id="jobs" className="container mx-auto py-16 px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Open Positions
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore opportunities across departments and locations
          </p>
        </div>

        {jobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-200 rounded-full mb-6">
              <Search className="w-8 h-8 text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Open Positions</h3>
            <p className="text-gray-600">Check back soon for new opportunities!</p>
          </div>
        )}
      </main>
    </div>
  );
}
