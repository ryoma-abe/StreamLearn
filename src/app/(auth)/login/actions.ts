"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { prisma } from "@/lib/prisma";

export async function login(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { data: authData, error } = await supabase.auth.signInWithPassword(
    data
  );

  if (error) {
    console.error("Login error:", error);
    redirect("/error");
  }
  if (authData.user) {
    try {
      const existingUser = await prisma.user.findUnique({
        where: { email: authData.user.email },
      });

      if (!existingUser) {
        await prisma.user.create({
          data: {
            id: authData.user.id,
            email: authData.user.email!,
            name: authData.user.email!.split("@")[0],
          },
        });
      }
    } catch (dbError) {
      console.error("8. Database error:", dbError);
    }
  }

  revalidatePath("/", "layout");
  redirect("/account");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { data: authData, error } = await supabase.auth.signUp(data);

  if (error) {
    console.error("Signup error:", error);
    redirect("/error");
  }

  if (authData.user) {
    try {
      await prisma.user.create({
        data: {
          id: authData.user.id,
          email: authData.user.email!,
          name: authData.user.email!.split("@")[0],
        },
      });
    } catch (dbError) {
      console.error("7. Error creating user in database:", dbError);
      await prisma.user.findUnique({
        where: { id: authData.user.id },
      });
    }
  }

  revalidatePath("/", "layout");
  redirect("/account");
}
