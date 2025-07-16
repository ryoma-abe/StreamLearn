import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";

export default async function EditPage({ params }: { params: { id: string } }) {
  const course = await prisma.course.findUnique({
    where: { id: params.id },
  });
  return (
    <div className="container mx-auto max-w-lg px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-900">コース編集</h1>
        <form
          action={`/api/courses/${params.id}`}
          method="POST"
          className="space-y-6"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              タイトル
            </label>
            <input
              type="text"
              name="title"
              defaultValue={course?.title}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              価格
            </label>
            <input
              type="number"
              name="price"
              defaultValue={course?.price}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit">更新する</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
