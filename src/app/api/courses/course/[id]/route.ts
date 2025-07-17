import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// 講師の教材投稿→DB登録.
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // フォームから送信されたデータ
  const body = await request.json();

  await prisma.course.update({
    where: {
      id: params.id,
    },
    data: {
      title: body.title,
      description: body.description,
      price: Number(body.price),
      videoUrl: body.videoUrl,
    },
  });

  return NextResponse.json(
    { message: "Course created successfully" },
    { status: 201 }
  );
}
