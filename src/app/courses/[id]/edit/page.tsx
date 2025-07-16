import EditForm from "@/components/instructor/edit-form";
import { prisma } from "@/lib/prisma";

export default async function EditCoursePage({
  params,
}: {
  params: { id: string };
}) {
  // 選択された教材を取得
  const course = await prisma.course.findUnique({
    where: { id: params.id },
  });

  return <EditForm course={course} />;
}
