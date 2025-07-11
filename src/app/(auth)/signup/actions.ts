"use server";
import { createClient } from "@/utils/supabase/server";
import { State } from "../login/actions";
import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";

export async function signup(_: State, formData: FormData): Promise<State> {
  const supabase = await createClient();

  // 新規ユーザーの場合
  const { data, error } = await supabase.auth.signUp({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (!data.user) return { error: error?.message };

  // 登録が成功した時
  if (data.user) {
    await prisma.user.upsert({
      where: { id: data.user.id },
      update: {},
      create: {
        id: data.user.id,
        email: data.user.email!,
        name: formData.get("name") as string,
        role: formData.get("role") as Role,
      },
    });
  }

  return { success: "Signup successful" };
}
