import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  // サーバー用のクライアントを作成
  // 新しいcookieを使用してユーザーのセッションを維持することができる
  // ユーザーのセッションを維持することができる
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // サーバーコンポーネントから呼び出された場合は無視
            // ミドルウェアでユーザーセッションを更新する場合は無視してよい
          }
        },
      },
    }
  );
}
