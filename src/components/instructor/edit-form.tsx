import { Course } from "@prisma/client";

type EditFormProps = {
  course: Course | null;
};

export default function EditForm({ course }: EditFormProps) {
  return <div>{course?.id}</div>;
}
