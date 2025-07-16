import { prisma } from "@/lib/prisma";

export default async function EditPage({ params }: { params: { id: string } }) {
  const course = await prisma.course.findUnique({
    where: { id: params.id },
  });
  return (
    <div>
      <p>{course?.title}</p>
    </div>
  );
}
