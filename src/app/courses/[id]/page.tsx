import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import Markdown from "react-markdown";

export default async function CourseDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const course = await prisma.course.findUnique({
    where: { id: params.id },
  });

  if (!course) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            コースが見つかりません
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-8">
        {/* ヘッダー部分 */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">{course.title}</h1>
          {/* ここに講師情報 */}
        </div>

        {/* 動画部分 */}
        {course.videoUrl && (
          <div className="aspect-video w-full">
            <iframe
              className="w-full h-full rounded-lg shadow-lg"
              src={
                course.videoUrl
                  .replace("youtu.be/", "youtube.com/embed/")
                  .split("?")[0]
              }
              title={`${course.title} - 紹介動画`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}

        {/* コンテンツ部分 */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg border p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">
              コースについて
            </h2>
            <div className="prose prose-lg max-w-none">
              <Markdown>{course.description}</Markdown>
            </div>

            <div className="border-t pt-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-medium text-gray-900">価格</span>
                <span className="text-2xl font-bold text-indigo-600">
                  ¥{course.price.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-center">
                <Button className="w-full sm:w-auto px-8 py-3 text-lg font-semibold">
                  購入する
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
