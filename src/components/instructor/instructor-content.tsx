"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import InstructorModal from "./instructor-modal";
import CourseList from "./course-list";

export default function InstructorContent() {
  const [isOpen, setIsOpen] = useState(false);
  const modalOpen = () => {
    setIsOpen(true);
  };

  // 登録処理
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); // ページリロード防止

    const formData = new FormData(event.currentTarget);

    const res = await fetch("/api/courses", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      setIsOpen(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-lg border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3>教材管理</h3>
          <Button onClick={modalOpen}>教材投稿する</Button>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium">教材一覧</h4>
          <CourseList />
        </div>

        {/* モーダル */}
        {isOpen && (
          <InstructorModal setIsOpen={setIsOpen} handleSubmit={handleSubmit} />
        )}
      </div>
    </div>
  );
}
