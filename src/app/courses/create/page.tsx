import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import CourseForm from './course-form';

export default async function CreateCoursePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">新規コース作成</h1>
      <CourseForm instructorId={user.id} />
    </div>
  );
}