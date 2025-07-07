"use client";
import { useActionState } from "react";
import { signup } from "../signup/actions";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CreateAccountPage() {
  const [signupState, signupAction] = useActionState(signup, {});
  
  return (
    <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center">
      <div className="w-full max-w-sm space-y-8">
        {signupState.success ? (
          <div className="text-center space-y-6">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold tracking-tight">登録完了</h1>
              <p className="text-muted-foreground">
                登録したメールアドレスに確認メールを送信しました。
              </p>
            </div>
            <Button className="w-full" asChild>
              <Link href="/login">ログインページへ</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="text-center">
              <h1 className="text-2xl font-bold tracking-tight">アカウント作成</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                StreamLearnで学習を始めましょう
              </p>
            </div>

            <form action={signupAction} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    メールアドレス
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    required
                    autoComplete="email"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium">
                    パスワード
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    required
                    autoComplete="new-password"
                  />
                </div>
              </div>

              {signupState.error && (
                <div className="rounded-md bg-destructive/10 p-3">
                  <p className="text-sm text-destructive">{signupState.error}</p>
                </div>
              )}

              <Button type="submit" className="w-full">
                アカウントを作成
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground">
              すでにアカウントをお持ちの方は{" "}
              <Link href="/login" className="font-medium text-primary hover:underline">
                ログイン
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
