"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { login, type State } from "./actions";
import Link from "next/link";

export default function AuthPage() {
  const [loginState, loginAction] = useActionState<State, FormData>(login, {});

  return (
    <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight">おかえりなさい</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            アカウントにログインして学習を続けましょう
          </p>
        </div>

        <form action={loginAction} className="space-y-6">
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
                autoComplete="current-password"
              />
            </div>
          </div>

          {loginState.error && (
            <div className="rounded-md bg-destructive/10 p-3">
              <p className="text-sm text-destructive">{loginState.error}</p>
            </div>
          )}

          <Button type="submit" className="w-full">
            ログイン
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          アカウントをお持ちでない方は{" "}
          <Link href="/signup" className="font-medium text-primary hover:underline">
            新規登録
          </Link>
        </p>
      </div>
    </div>
  );
}
