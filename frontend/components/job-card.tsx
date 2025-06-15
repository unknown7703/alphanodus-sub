import Link from 'next/link';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Briefcase, MapPin, CalendarDays, ArrowRight } from 'lucide-react';

interface Job {
  id: number;
  title: string;
  department: string;
  location: string;
  posting_date: string;
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
};

// Updated: Clean badge color mapping (no gradients)
const getDepartmentColor = (department: string) => {
  const colors: { [key: string]: string } = {
    Engineering: 'bg-blue-100 text-blue-700',
    Design: 'bg-pink-100 text-pink-700',
    Marketing: 'bg-green-100 text-green-700',
    Sales: 'bg-orange-100 text-orange-700',
    HR: 'bg-indigo-100 text-indigo-700',
    Finance: 'bg-gray-100 text-gray-700',
  };
  return colors[department] || 'bg-slate-100 text-slate-700';
};

export function JobCard({ job }: { job: Job }) {
  return (
    <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 rounded-lg bg-white">
      <div className="p-5">
        <CardHeader className="p-0 mb-4">
          <div className="flex items-start justify-between mb-3">
            <Badge className={`rounded-md px-2 py-1 text-xs font-medium ${getDepartmentColor(job.department)}`}>
              {job.department}
            </Badge>
            <div className="text-xs text-gray-500 flex items-center">
              <CalendarDays className="h-3 w-3 mr-1" />
              {formatDate(job.posting_date)}
            </div>
          </div>
          <CardTitle className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors">
            {job.title}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-3 mt-2 text-sm text-gray-700">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 text-gray-400 mr-2" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center">
            <Briefcase className="h-4 w-4 text-gray-400 mr-2" />
            <span>Full-time Position</span>
          </div>
        </CardContent>

        <CardFooter className="pt-5 px-0">
          <Button
            asChild
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition-all"
          >
            <Link href={`/jobs/${job.id}`} className="flex items-center justify-center">
              View Details
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}
