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
    <div>
      <SectionHeader title="ダッシュボード" />
      <p>{dbUser?.role}</p>
      {/* 講師側のコンテンツ */}
      {dbUser?.role === "INSTRUCTOR" ? (
        <div className="mt-10">
          <InstructorContent />
        </div>
      ) : (
        <div className="mt-10">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            受講中のコース
          </h3>
        </div>
      )}
      {/* 共通のコンテンツ */}
      <div className="pt-4 max-w-sm">
        <form action="/auth/signout" method="post">
          <button
            className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
            type="submit"
          >
            Sign out
          </button>
        </form>
      </div>
      <AccountForm user={user} />
    </div>
  );
}
