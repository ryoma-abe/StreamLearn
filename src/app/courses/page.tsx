import PageNation from "@/components/common/PageNation";
import SectionHeader from "@/components/common/section-header";
import { getPaginatedCourses } from "@/lib/course-utils";
import Link from "next/link";

const ITEMS_PER_PAGE = 9;

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const { courses, totalPages } = await getPaginatedCourses(
    currentPage,
    ITEMS_PER_PAGE
  );
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
              href={`/courses/${course.id}`}
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
      {/* ページネーション */}
      <PageNation totalPages={totalPages} currentPage={currentPage} />
    </div>
  );
}
