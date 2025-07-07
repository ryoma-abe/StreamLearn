import SectionHeader from "@/components/common/section-header";
import AccountForm from "./account-form";
import { createClient } from "@/utils/supabase/server";
import { prisma } from "@/lib/prisma";
import InstructorContent from "@/components/instructor-content";

export default async function Account() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Prismaからユーザー情報を取得（emailで検索）
  const dbUser = user
    ? await prisma.user.findUnique({
        where: { email: user.email! },
      })
    : null;

  return (
    <div className="space-y-8">
      {/* ヘッダーセクション */}
      <div className="border-b pb-6">
        <h1 className="text-3xl font-bold">ダッシュボード</h1>
        <p className="mt-2 text-muted-foreground">
          {dbUser?.role === "INSTRUCTOR" ? "講師アカウント" : "受講者アカウント"}
        </p>
      </div>

      {/* メインコンテンツ */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* 左側：メインコンテンツ */}
        <div className="lg:col-span-2 space-y-8">
          {dbUser?.role === "INSTRUCTOR" ? (
            <InstructorContent />
          ) : (
            <section>
              <h2 className="mb-4 text-xl font-semibold">受講中のコース</h2>
              <div className="rounded-lg border bg-muted/30 p-8 text-center">
                <p className="text-muted-foreground">
                  現在受講中のコースはありません
                </p>
              </div>
            </section>
          )}
        </div>

        {/* 右側：サイドバー */}
        <div className="space-y-6">
          {/* アカウント情報 */}
          <section className="rounded-lg border p-6">
            <h3 className="mb-4 font-semibold">アカウント情報</h3>
            <AccountForm user={user} />
          </section>

          {/* サインアウト */}
          <section className="rounded-lg border p-6">
            <form action="/auth/signout" method="post">
              <button
                className="w-full rounded-lg bg-destructive px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-destructive/90"
                type="submit"
              >
                サインアウト
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
