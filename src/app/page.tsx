import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative py-20 text-center">
        <div className="mx-auto max-w-3xl space-y-6">
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
            学びを、もっと身近に
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl">
            StreamLearnは、あなたの学習体験を革新的に変える
            オンライン学習プラットフォームです
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" asChild>
              <Link href="/courses">コースを探す</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/signup">無料で始める</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-12 text-center">なぜStreamLearnなのか</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="space-y-3 text-center">
              <div className="mx-auto h-12 w-12 rounded-lg bg-primary/10" />
              <h3 className="text-xl font-semibold">高品質なコンテンツ</h3>
              <p className="text-muted-foreground">
                プロフェッショナルによる実践的な学習コンテンツ
              </p>
            </div>
            <div className="space-y-3 text-center">
              <div className="mx-auto h-12 w-12 rounded-lg bg-primary/10" />
              <h3 className="text-xl font-semibold">柔軟な学習スタイル</h3>
              <p className="text-muted-foreground">
                いつでも、どこでも、自分のペースで学習
              </p>
            </div>
            <div className="space-y-3 text-center">
              <div className="mx-auto h-12 w-12 rounded-lg bg-primary/10" />
              <h3 className="text-xl font-semibold">実践的なプロジェクト</h3>
              <p className="text-muted-foreground">
                実際のプロジェクトを通じてスキルを習得
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="rounded-2xl bg-muted/50 py-16 text-center">
        <div className="mx-auto max-w-2xl space-y-6">
          <h2>今すぐ学習を始めましょう</h2>
          <p className="text-lg text-muted-foreground">
            無料で登録して、最初のコースを体験してください
          </p>
          <Button size="lg" asChild>
            <Link href="/signup">無料で登録</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
