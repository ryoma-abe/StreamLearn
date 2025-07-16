import Link from "next/link";
import { Button } from "../ui/button";
import CourseList from "./course-list";
export default function InstructorContent() {
  return (
    <div className="space-y-6">
      <div className="rounded-lg border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3>教材管理</h3>
          <Button asChild>
            <Link href="/courses/create/">教材投稿する</Link>
          </Button>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium">教材一覧</h4>
          <CourseList />
        </div>
      </div>
    </div>
  );
}
