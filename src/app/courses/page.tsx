import SectionHeader from "@/components/common/section-header";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

const ITEMS_PER_PAGE = 9; // 1ページあたりの表示件数
export default async function CoursesPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  // ページネーションの処理
  const currentPage = Number(searchParams.page) || 1;
  const skip = (currentPage - 1) * ITEMS_PER_PAGE;
  const [courses, totalCount] = await Promise.all([
    prisma.course.findMany({
      orderBy: { createdAt: "desc" },
      skip,
      take: ITEMS_PER_PAGE,
    }),
    prisma.course.count(),
  ]);

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

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
      <div className="flex justify-center gap-2 mt-8">
        {currentPage > 1 && (
          <Link
            href={`/courses?page=${currentPage - 1}`}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            前へ
          </Link>
        )}

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Link
            key={page}
            href={`/courses?page=${page}`}
            className={`px-4 py-2 border rounded ${
              page === currentPage
                ? "bg-primary text-primary-foreground"
                : "hover:bg-gray-100"
            }`}
          >
            {page}
          </Link>
        ))}

        {currentPage < totalPages && (
          <Link
            href={`/courses?page=${currentPage + 1}`}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            次へ
          </Link>
        )}
      </div>
    </div>
  );
}
