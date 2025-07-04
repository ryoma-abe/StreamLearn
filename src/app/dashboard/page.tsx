import SectionHeader from "@/components/common/section-header";

export default function DashboardPage() {
  return (
    <div>
      <SectionHeader title="ダッシュボード" />
      {/* 受講生側のコンテンツ */}
      <div className="mt-10">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          受講中のコース
        </h3>
      </div>
      {/* 講師側のコンテンツ */}
      <div className="mt-10">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          講師用のコンテンツ
        </h3>
      </div>
    </div>
  );
}
