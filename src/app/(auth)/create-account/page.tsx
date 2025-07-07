"use client";
import { useActionState } from "react";
import { signup } from "../login/actions";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CreateAccountPage() {
  const [signupState, signupAction] = useActionState(signup, {});
  return (
    <div className="mx-auto max-w-md space-y-10">
      {/* サインアップフォーム */}
      {signupState.success ? (
        <div className="text-center space-y-4">
          <p className="text-green-600 text-base font-medium">
            登録したメールアドレスに確認メールを送信しました。
          </p>
          {/* ログインページへのリンク */}
          <Button className="w-full bg-indigo-600 text-white hover:bg-indigo-700">
            <Link href="/login">ログイン</Link>
          </Button>
        </div>
      ) : (
        <form action={signupAction} className="space-y-4">
          <h2 className="text-xl font-bold">新規登録</h2>

          <input
            name="email"
            type="email"
            placeholder="メール"
            required
            className="w-full border p-2"
          />
          <input
            name="password"
            type="password"
            placeholder="パスワード"
            required
            className="w-full border p-2"
          />

          {signupState.error && (
            <p className="text-red-500 text-sm">{signupState.error}</p>
          )}

          <Button type="submit" className="w-full bg-green-600 text-white">
            登録
          </Button>
        </form>
      )}
    </div>
  );
}
