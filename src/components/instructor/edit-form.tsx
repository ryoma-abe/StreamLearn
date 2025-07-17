"use client";
import { Course } from "@prisma/client";
import SectionHeader from "../common/section-header";
import { useState } from "react";
import { Button } from "../ui/button";
import LoadingSpinner from "../common/LoadingSpinner";
import Markdown from "react-markdown";

type EditFormProps = {
  course: Course | null;
};

export default function EditForm({ course }: EditFormProps) {
  const [markdown, setMarkdown] = useState("");
  const [message, setMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  // 登録処理
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    setLoading(true);
    const form = event.currentTarget;
    event.preventDefault(); // ページリロード防止

    const formData = new FormData(form);

    const res = await fetch("/api/courses", {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      setLoading(false);
      setMessage(true);
      form.reset();
      setMarkdown("");
    }
    setTimeout(() => {
      setMessage(false);
    }, 5000);
  }
  return (
    <>
      <SectionHeader title="教材編集" />
      {message && (
        <p className="text-center p-10 my-10 bg-green-300">送信完了しました</p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            タイトル
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            defaultValue={course?.title}
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            説明
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="マークダウンを入力してください"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={4}
            defaultValue={course?.description}
          />
        </div>
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            価格(円)
          </label>
          <input
            type="text"
            id="price"
            name="price"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            defaultValue={course?.price}
          />
        </div>
        {course?.videoUrl && (
          <div>
            <label
              htmlFor="video"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              動画URL
            </label>
            <input
              type="url"
              id="videoUrl"
              name="videoUrl"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-1 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              defaultValue={course?.videoUrl}
            />
          </div>
        )}

        <div className="pt-4 flex justify-center">
          <Button type="submit" className="max-w-[300] w-full">
            {loading ? <LoadingSpinner /> : "投稿"}
          </Button>
        </div>
        {markdown && (
          <div className="mt-10">
            <div className="border border-gray-200 rounded-md p-4 bg-gray-50 prose prose-sm max-w-none">
              <Markdown>{markdown}</Markdown>
            </div>
          </div>
        )}
      </form>
    </>
  );
}
