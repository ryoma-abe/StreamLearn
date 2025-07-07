import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ErrorPage() {
  return (
    <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center">
      <div className="w-full max-w-md text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">エラーが発生しました</h1>
          <p className="text-muted-foreground">
            申し訳ございません。予期しないエラーが発生しました。
          </p>
        </div>
        
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild>
            <Link href="/">ホームに戻る</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/login">ログインページへ</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
