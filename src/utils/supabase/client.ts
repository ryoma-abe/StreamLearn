import { createBrowserClient } from "@supabase/ssr";
export function createClient() {
  // ブラウザ用のクライアントを作成
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
