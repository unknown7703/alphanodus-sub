// frontend/app/admin/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <Card>
        <CardHeader>
          <CardTitle>Welcome, Admin!</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Use the navigation on the left to manage job listings and view applications.</p>
        </CardContent>
      </Card>
    </div>
  );
}
