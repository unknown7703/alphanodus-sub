// frontend/components/application-form.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';



const formSchema = z.object({
  fullName: z.string().min(2).max(32),
  email: z.string().email(),
  phoneNumber: z.string().min(10),
  resume: z.any().refine((file) => file?.length == 1, 'Resume is required.'),
  coverLetter: z.string().optional(),
});

export function ApplicationForm({ jobId }: { jobId: number }) {
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append('fullName', values.fullName);
    formData.append('email', values.email);
    formData.append('phoneNumber', values.phoneNumber);
    formData.append('resume', values.resume[0]);
    if(values.coverLetter) formData.append('coverLetter', values.coverLetter);

    try {
      await axios.post(`http://localhost:5000/api/jobs/${jobId}/apply`, formData);
      
      form.reset();
    } catch (error: any) {
     
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* ... FormField for fullName, email, phoneNumber, coverLetter ... */}
         <FormField
          control={form.control}
          name="resume"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Resume (PDF only)</FormLabel>
              <FormControl>
                 <Input type="file" accept=".pdf" {...form.register("resume")} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit Application</Button>
      </form>
    </Form>
  );
}
