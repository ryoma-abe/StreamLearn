import EditForm from "@/components/instructor/edit-form";
import { getCourseById } from "@/lib/course";

export default async function EditCoursePage({
  params,
}: {
  params: { id: string };
}) {
  const course = await getCourseById(params.id);

  return <EditForm course={course} />;
}
