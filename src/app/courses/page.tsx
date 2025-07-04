import SectionHeader from "@/components/common/section-header";
import Link from "next/link";

export default function CoursesPage() {
  return (
    <div>
      <SectionHeader title="コース一覧" />
      <div className="space-y-4 mt-10">
        <article className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
          <Link href="/courses/1" className="block p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              コース1
            </h3>
            <p className="text-gray-600">コースの説明文がここに入ります</p>
          </Link>
        </article>

        <article className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
          <Link href="/courses/2" className="block p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              コース2
            </h3>
            <p className="text-gray-600">コースの説明文がここに入ります</p>
          </Link>
        </article>

        <article className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
          <Link href="/courses/3" className="block p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              コース3
            </h3>
            <p className="text-gray-600">コースの説明文がここに入ります</p>
          </Link>
        </article>
      </div>
    </div>
  );
}
