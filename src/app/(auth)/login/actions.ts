// app/(auth)/login/actions.ts
"use server";

import { createClient } from "@/utils/supabase/server";
import { prisma } from "@/lib/prisma";

export type State = { error?: string; success?: string };

export async function login(_: State, formData: FormData): Promise<State> {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (error) return { error: error.message };

  if (data.user) {
    await prisma.user.upsert({
      where: { id: data.user.id },
      update: {},
      create: {
        id: data.user.id,
        email: data.user.email!,
        name: data.user.email!.split("@")[0],
      },
    });
  }

  return {};
}

export async function signup(_: State, formData: FormData): Promise<State> {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (error) return { error: error.message };
  if (data.user) {
    await prisma.user.upsert({
      where: { id: data.user.id },
      update: {},
      create: {
        id: data.user.id,
        email: data.user.email!,
        name: data.user.email!.split("@")[0],
      },
    });
  }

  return { success: "Signup successful" };
}
