import SectionHeader from "@/components/common/section-header";
import Link from "next/link";

export default function CoursesPage() {
  return (
    <div className="space-y-8">
      <SectionHeader title="コース一覧" />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <article className="rounded-lg border hover:shadow-lg transition-shadow">
          <Link href="/courses/1" className="block p-6 space-y-3">
            <h3>コース1</h3>
            <p className="text-muted-foreground text-sm">
              コースの説明文がここに入ります
            </p>
          </Link>
        </article>

        <article className="rounded-lg border hover:shadow-lg transition-shadow">
          <Link href="/courses/2" className="block p-6 space-y-3">
            <h3>コース2</h3>
            <p className="text-muted-foreground text-sm">
              コースの説明文がここに入ります
            </p>
          </Link>
        </article>

        <article className="rounded-lg border hover:shadow-lg transition-shadow">
          <Link href="/courses/3" className="block p-6 space-y-3">
            <h3>コース3</h3>
            <p className="text-muted-foreground text-sm">
              コースの説明文がここに入ります
            </p>
          </Link>
        </article>
      </div>
    </div>
  );
}
