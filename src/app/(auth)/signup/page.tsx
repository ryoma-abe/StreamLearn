"use client";
import { useActionState } from "react";
import { signup } from "../signup/actions";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CreateAccountPage() {
  const [signupState, signupAction] = useActionState(signup, {});
  return (
    <div className="mx-auto max-w-md">
      {signupState.success ? (
        <div className="text-center space-y-6 rounded-lg border p-8 bg-card">
          <p className="text-green-600 font-medium">
            登録したメールアドレスに確認メールを送信しました。
          </p>
          <Button className="w-full" asChild>
            <Link href="/login">ログイン</Link>
          </Button>
        </div>
      ) : (
        <form action={signupAction} className="space-y-6 rounded-lg border p-8 bg-card">
          <h1 className="text-center">新規登録</h1>

          <div className="space-y-4">
            <input
              name="email"
              type="email"
              placeholder="メール"
              required
              className="w-full border p-3 rounded-md"
            />
            <input
              name="password"
              type="password"
              placeholder="パスワード"
              required
              className="w-full border p-3 rounded-md"
            />
          </div>

          {signupState.error && (
            <p className="text-red-500 text-sm text-center">{signupState.error}</p>
          )}

          <Button type="submit" className="w-full">
            登録
          </Button>
        </form>
      )}
    </div>
  );
}
