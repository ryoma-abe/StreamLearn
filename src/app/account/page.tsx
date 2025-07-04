import SectionHeader from "@/components/common/section-header";
import AccountForm from "./account-form";
import { createClient } from "@/utils/supabase/server";

export default async function Account() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div>
      <SectionHeader title="ダッシュボード" />
      {/* 講師側のコンテンツ */}
      {user?.role === "instructor" ? (
        <div className="mt-10">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            講師用のコンテンツ
          </h3>
        </div>
      ) : (
        <div className="mt-10">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            受講中のコース
          </h3>
        </div>
      )}
      {/* 共通のコンテンツ */}
      <AccountForm user={user} />
    </div>
  );
}
