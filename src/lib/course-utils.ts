import { prisma } from "./prisma";

export const getPaginatedCourses = async (
  page: number,
  itemsPerPage: number
) => {
  const skip = (page - 1) * itemsPerPage;
  const [courses, totalCount] = await Promise.all([
    prisma.course.findMany({
      orderBy: { createdAt: "desc" },
      skip,
      take: itemsPerPage,
    }),
    prisma.course.count(),
  ]);

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  return { courses, totalPages, totalCount };
};
