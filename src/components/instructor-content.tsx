import { Button } from "./ui/button";
import Link from "next/link";

export default function InstructorContent() {
  return (
    <div className="space-y-8">
      {/* 教材管理セクション */}
      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">教材管理</h2>
          <Button asChild>
            <Link href="/courses/create">新規教材を投稿</Link>
          </Button>
        </div>
        
        {/* 教材一覧 */}
        <div className="space-y-4">
          <div className="rounded-lg border p-6">
            <h3 className="mb-2 font-medium">投稿した教材</h3>
            <div className="text-center py-8 text-muted-foreground">
              まだ教材を投稿していません
            </div>
          </div>
        </div>
      </section>

      {/* 統計情報セクション */}
      <section>
        <h2 className="mb-6 text-xl font-semibold">統計情報</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border p-6 text-center">
            <p className="text-2xl font-bold">0</p>
            <p className="text-sm text-muted-foreground">投稿コース数</p>
          </div>
          <div className="rounded-lg border p-6 text-center">
            <p className="text-2xl font-bold">0</p>
            <p className="text-sm text-muted-foreground">受講者数</p>
          </div>
          <div className="rounded-lg border p-6 text-center">
            <p className="text-2xl font-bold">¥0</p>
            <p className="text-sm text-muted-foreground">今月の収益</p>
          </div>
        </div>
      </section>
    </div>
  );
}
