import Link from "next/link";

export default function CoursesPage() {
  // ダミーデータ（実際はAPIから取得）
  const courses = [
    {
      id: 1,
      title: "React完全ガイド",
      description: "Reactの基礎から実践的なアプリケーション開発まで学べるコースです",
      instructor: "田中太郎",
      duration: "10時間",
      level: "初級〜中級",
      price: "¥12,000",
      thumbnail: "/api/placeholder/300/200"
    },
    {
      id: 2,
      title: "TypeScript実践入門",
      description: "型安全なJavaScript開発のためのTypeScriptマスターコース",
      instructor: "佐藤花子",
      duration: "8時間",
      level: "中級",
      price: "¥9,800",
      thumbnail: "/api/placeholder/300/200"
    },
    {
      id: 3,
      title: "Next.js + Supabaseで作るWebアプリ",
      description: "モダンなフルスタックアプリケーションの構築方法を学びます",
      instructor: "鈴木一郎",
      duration: "15時間",
      level: "中級〜上級",
      price: "¥18,000",
      thumbnail: "/api/placeholder/300/200"
    }
  ];

  return (
    <div className="space-y-8">
      {/* ヘッダーセクション */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">コース一覧</h1>
        <p className="text-muted-foreground">
          あなたのスキルアップに最適なコースを見つけましょう
        </p>
      </div>

      {/* フィルターセクション（将来の拡張用） */}
      <div className="flex flex-wrap gap-4">
        <select className="rounded-lg border px-4 py-2 text-sm">
          <option>すべてのカテゴリー</option>
          <option>プログラミング</option>
          <option>デザイン</option>
          <option>ビジネス</option>
        </select>
        <select className="rounded-lg border px-4 py-2 text-sm">
          <option>レベル</option>
          <option>初級</option>
          <option>中級</option>
          <option>上級</option>
        </select>
      </div>

      {/* コースグリッド */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <article
            key={course.id}
            className="group overflow-hidden rounded-lg border bg-card transition-all hover:shadow-lg"
          >
            <Link href={`/courses/${course.id}`} className="block">
              {/* サムネイル */}
              <div className="aspect-video overflow-hidden bg-muted">
                <div className="flex h-full items-center justify-center text-muted-foreground">
                  <span>コース画像</span>
                </div>
              </div>
              
              {/* コンテンツ */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                    {course.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                    {course.description}
                  </p>
                </div>
                
                {/* メタ情報 */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <span>講師: {course.instructor}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">{course.duration} • {course.level}</span>
                  </div>
                </div>
                
                {/* 価格 */}
                <div className="pt-2 border-t">
                  <span className="text-xl font-bold">{course.price}</span>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>

      {/* ページネーション（将来の拡張用） */}
      <div className="flex justify-center pt-8">
        <div className="flex gap-2">
          <button className="px-4 py-2 text-sm border rounded-lg hover:bg-accent">前へ</button>
          <button className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg">1</button>
          <button className="px-4 py-2 text-sm border rounded-lg hover:bg-accent">2</button>
          <button className="px-4 py-2 text-sm border rounded-lg hover:bg-accent">3</button>
          <button className="px-4 py-2 text-sm border rounded-lg hover:bg-accent">次へ</button>
        </div>
      </div>
    </div>
  );
}
