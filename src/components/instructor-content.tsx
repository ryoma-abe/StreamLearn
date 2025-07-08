"use client";
import { useState } from "react";
import { Button } from "./ui/button";

export default function InstructorContent() {
  const [isOpen, setIsOpen] = useState(false);
  const modalOpen = () => {
    setIsOpen(true);
  };
  return (
    <div className="space-y-6">
      <div className="rounded-lg border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3>教材管理</h3>
          <Button onClick={modalOpen}>教材投稿する</Button>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium">教材一覧</h4>
          <p className="text-muted-foreground text-sm">
            まだ教材を投稿していません
          </p>
        </div>

        {/* モーダル */}
        {isOpen && (
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-lg p-6 w-full max-w-md mx-4"
            >
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-lg font-semibold">教材投稿</h4>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <form method="POST" action="/api/courses" className="space-y-4">
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
                    placeholder="教材のタイトルを入力"
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
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="教材の説明を入力"
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
                    placeholder="価格"
                  />
                </div>
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
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsOpen(false)}
                    className="flex-1"
                  >
                    キャンセル
                  </Button>
                  <Button type="submit" className="flex-1">
                    投稿
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
