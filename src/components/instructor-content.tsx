import Link from "next/link";
import { Button } from "./ui/button";

export default function InstructorContent() {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">教材管理</h3>
      <div className="mt-4">
        <h4 className="text-base font-semibold text-gray-900 mb-2">教材一覧</h4>
      </div>
      <div className="mt-4">
        <div className="mt-2">
          <Button>
            <Link href="/account/instructor/courses/new">教材投稿ページへ</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
