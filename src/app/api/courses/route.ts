import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { title, description, price, videoUrl } = await request.json();
  const instructor = await prisma.user.findUnique({
    where: {
      email: "test@test.com",
    },
  });

  if (!instructor) {
    return NextResponse.json(
      { error: "Instructor not found" },
      { status: 404 }
    );
  }
  const instructorId = instructor.id;

  await prisma.course.create({
    data: {
      title,
      description,
      videoUrl,
      price,
      instructor: {
        connect: { id: instructorId },
      },
    },
  });
}
