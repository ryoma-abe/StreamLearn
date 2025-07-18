import Link from "next/link";
type PaginationProps = {
  currentPage: number;
  totalPages: number;
};
export default async function PageNation({
  currentPage,
  totalPages,
}: PaginationProps) {
  return (
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
  );
}
