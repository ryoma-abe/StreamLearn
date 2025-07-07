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
      <div>
        <SectionHeader title="ダッシュボード" />
        <p className="text-muted-foreground mt-2">
          {dbUser?.role === "INSTRUCTOR"
            ? "講師アカウント"
            : "受講者アカウント"}
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          {dbUser?.role === "INSTRUCTOR" ? (
            <InstructorContent />
          ) : (
            <div className="rounded-lg border p-6">
              <h3 className="mb-4">受講中のコース</h3>
              <p className="text-muted-foreground text-sm">
                現在受講中のコースはありません
              </p>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="rounded-lg border p-6">
            <h3 className="mb-4">アカウント情報</h3>
            <AccountForm user={user} />
          </div>

          <div className="rounded-lg border p-6">
            <form action="/auth/signout" method="post">
              <button
                className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
                type="submit"
              >
                サインアウト
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
