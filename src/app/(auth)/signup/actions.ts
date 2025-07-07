import { createClient } from "@/utils/supabase/server";
import { State } from "../login/actions";
import { prisma } from "@/lib/prisma";

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
