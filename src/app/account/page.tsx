import SectionHeader from "@/components/common/section-header";
import AccountForm from "./account-form";
import { createClient } from "@/utils/supabase/server";
import { prisma } from "@/lib/prisma";
import InstructorContent from "@/components/instructor/instructor-content";
import SigninOutButton from "@/components/auth/signout-button";
import UserContent from "@/components/user/user-content";

export default async function Account() {
  const supabase = await createClient();

  // ここで現在ログインしているユーザーの情報を取得
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Prismaとログインユーザーの紐付け
  const dbUser = user
    ? await prisma.user.findUnique({
        where: { email: user.email! },
      })
    : null;

  return (
    <div className="space-y-8">
      <div>
        <SectionHeader title="アカウントページ" />
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
              <div className="text-muted-foreground text-sm">
                <UserContent />
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <AccountForm />
          <SigninOutButton />
        </div>
      </div>
    </div>
  );
}
