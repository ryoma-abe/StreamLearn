"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { login, type State } from "./actions";

export default function AuthPage() {
  const [loginState, loginAction] = useActionState<State, FormData>(login, {});

  return (
    <div className="mx-auto max-w-md">
      <form action={loginAction} className="space-y-6 rounded-lg border p-8 bg-card">
        <h1 className="text-center">ログイン</h1>

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

        {loginState.error && (
          <p className="text-red-500 text-sm text-center">{loginState.error}</p>
        )}

        <Button type="submit" className="w-full">
          ログイン
        </Button>
      </form>
    </div>
  );
}
