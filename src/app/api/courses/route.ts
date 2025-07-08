import { createClient } from "@/utils/supabase/server";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// 講師の教材投稿→DB登録
export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    return NextResponse.json({ error: userError.message }, { status: 401 });
  }

  // フォームから送信されたデータ
  const formData = await request.formData();
  const title = formData.get("title");
  const description = formData.get("description");
  const price = formData.get("price");
  const videoUrl = formData.get("videoUrl");

  if (!title || !description || !price || !videoUrl) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const instructor = await prisma.user.findUnique({
    where: {
      email: user?.email,
    },
  });

  if (!instructor) {
    return NextResponse.json(
      { error: "Instructor not found" },
      { status: 404 }
    );
  }

  await prisma.course.create({
    data: {
      title: title as string,
      description: description as string,
      videoUrl: videoUrl as string,
      price: Number(price),
      instructor: {
        connect: { id: instructor.id },
      },
    },
  });

  return NextResponse.json(
    { message: "Course created successfully" },
    { status: 201 }
  );
}
// 教材取得(全ての)
export async function GET() {
  const courses = await prisma.course.findMany({
    orderBy: { createdAt: "desc" }, // 新しい順
  });
  return NextResponse.json(courses);
}
