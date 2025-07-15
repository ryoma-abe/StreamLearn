import { prisma } from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

// 受講教材取得
export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const myUserCourses = await prisma.purchase.findMany({
    where: {
      user: {
        email: user?.email,
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(myUserCourses);
}
