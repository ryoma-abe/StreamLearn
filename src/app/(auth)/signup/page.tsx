"use client";
import { useActionState } from "react";
import { signup } from "../signup/actions";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import LoadingSpinner from "@/components/common/LoadingSpinner";

export default function CreateAccountPage() {
  const [signupState, signupAction, isLoading] = useActionState(signup, {
    error: undefined,
    success: undefined,
  });
  return (
    <div className="mx-auto max-w-md">
      {signupState.success ? (
        <div className="text-center space-y-6 rounded-lg border p-8 bg-card">
          <p className="text-green-600 font-medium">登録が完了しました</p>
          <Button className="w-full" asChild>
            <Link href="/login">ログイン</Link>
          </Button>
        </div>
      ) : (
        <form
          action={signupAction}
          className="space-y-6 rounded-lg border p-8 bg-card"
        >
          <h1 className="text-center">新規登録</h1>

          <div className="space-y-4">
            <input
              name="name"
              type="text"
              placeholder="お名前"
              required
              className="w-full border p-3 rounded-md"
            />
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
            <div>
              <label className="block mb-2 font-medium">アカウント種別</label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="role"
                    value="USER"
                    defaultChecked
                    className="mr-2"
                    required
                  />
                  受講者
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="role"
                    value="INSTRUCTOR"
                    className="mr-2"
                    required
                  />
                  講師
                </label>
              </div>
            </div>
          </div>

          {signupState.error && (
            <p className="text-red-500 text-sm text-center">
              {signupState.error}
            </p>
          )}

          <Button type="submit" className="w-full">
            {isLoading ? <LoadingSpinner /> : "登録"}
          </Button>
        </form>
      )}
    </div>
  );
}
