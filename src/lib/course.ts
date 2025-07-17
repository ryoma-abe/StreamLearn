import { prisma } from "./prisma";

// アクセスされたコースを取得
export async function getCourseById(id: string) {
  return await prisma.course.findUnique({
    where: { id },
  });
}
