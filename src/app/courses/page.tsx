import SectionHeader from "@/components/common/section-header";
import Link from "next/link";
import { Course } from "@/types/course";

export default async function CoursesPage() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

  const res = await fetch(`${baseUrl}/api/courses`, {
    cache: "no-store", // サーバーからfetchするときの推奨
  });

  const courses: Course[] = await res.json();

  return (
    <div className="space-y-8">
      <SectionHeader title="コース一覧" />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <article
            key={course.id}
            className="rounded-lg border hover:shadow-lg transition-shadow"
          >
            <Link
              href={`${baseUrl}/courses/${course.id}`}
              className="block p-6 space-y-3"
            >
              <h3>{course.title}</h3>
              <p className="text-muted-foreground text-sm">
                {course.description}
              </p>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
