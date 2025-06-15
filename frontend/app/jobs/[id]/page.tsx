// frontend/app/jobs/[id]/page.tsx
import ApplicationForm from "@/components/application-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { 
  ArrowLeft, 
  MapPin, 
  Building2, 
  Calendar, 
  Clock, 
  Users,
  Briefcase 
} from "lucide-react";

async function getJobDetails(id: string) {
  const res = await fetch(`http://localhost:5000/api/jobs/${id}`, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}


const getDepartmentColor = (department: string) => {
  const colors: { [key: string]: string } = {
    'Engineering': 'bg-gradient-to-r from-blue-500 to-cyan-500',
    'Design': 'bg-gradient-to-r from-purple-500 to-pink-500',
    'Marketing': 'bg-gradient-to-r from-green-500 to-teal-500',
    'Sales': 'bg-gradient-to-r from-orange-500 to-red-500',
    'HR': 'bg-gradient-to-r from-indigo-500 to-purple-500',
    'Finance': 'bg-gradient-to-r from-gray-600 to-gray-800',
  };
  return colors[department] || 'bg-gradient-to-r from-slate-500 to-slate-600';
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export default async function JobDetailPage({ params }: { params: { id: string } }) {
  const job = await getJobDetails(params.id);

  if (!job) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="text-center py-8">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Job Not Found</h3>
            <p className="text-gray-600 mb-6">The job listing you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <Link href="/">Browse All Jobs</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="bg-white/80 backdrop-blur-sm border-b shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <Button variant="ghost" asChild className="mb-4 hover:bg-blue-50">
            <Link href="/" className="flex items-center text-blue-600">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Jobs
            </Link>
          </Button>
          
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <Badge className={`${getDepartmentColor(job.department)} text-white border-0 px-3 py-1 text-sm font-medium`}>
                  {job.department}
                </Badge>
                <span className="text-sm text-gray-500">•</span>
                <span className="text-sm text-gray-600">Posted {formatDate(job.posting_date)}</span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                {job.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-gray-600">
                <div className="flex items-center">
                  <Building2 className="w-5 h-5 mr-2 text-gray-400" />
                  <span className="font-medium">{job.department}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-gray-400" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-gray-400" />
                  <span>Full-time</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
 
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900 flex items-center">
                  <Briefcase className="w-6 h-6 mr-3 text-blue-600" />
                  Job Description
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {job.description}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">Quick Facts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <Users className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Team Size</p>
                      <p className="font-semibold text-gray-900">5-10 people</p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-green-50 rounded-lg">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <Calendar className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Start Date</p>
                      <p className="font-semibold text-gray-900">Immediate</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader className=" text-black rounded-t-lg">
                  <CardTitle className="text-xl font-semibold">
                    Apply for this Position
                  </CardTitle>
                  <p className="text-black text-sm">
                    Join our team and make an impact
                  </p>
                </CardHeader>
                <CardContent className="p-6">
                  <ApplicationForm jobId={job.id} />
                </CardContent>
              </Card>
            </div>
          
      </div>
    </div>
  );
}
