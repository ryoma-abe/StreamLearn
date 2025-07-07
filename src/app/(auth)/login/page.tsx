"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { login, type State } from "./actions";

export default function AuthPage() {
  const [loginState, loginAction] = useActionState<State, FormData>(login, {});

  return (
    <div className="mx-auto max-w-md space-y-10">
      {/* ログインフォーム */}
      <form action={loginAction} className="space-y-4">
        <h2 className="text-xl font-bold">ログイン</h2>

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

        {loginState.error && (
          <p className="text-red-500 text-sm">{loginState.error}</p>
        )}

        <Button type="submit" className="w-full bg-indigo-600 text-white">
          ログイン
        </Button>
      </form>
    </div>
  );
}
