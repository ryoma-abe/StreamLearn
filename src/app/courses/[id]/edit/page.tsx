import EditForm from "@/components/instructor/edit-form";
import { getCourseById } from "@/lib/course";

export default async function EditCoursePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const course = await getCourseById(id);

  return <EditForm course={course} />;
}
