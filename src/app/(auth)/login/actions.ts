"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { prisma } from "@/lib/prisma";

export async function login(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  console.log("=== Login Debug ===");
  console.log("1. Login email:", data.email);

  const { data: authData, error } = await supabase.auth.signInWithPassword(data);

  console.log("2. Login authData:", authData);
  console.log("3. Login error:", error);
  console.log("4. User ID from login:", authData?.user?.id);

  if (error) {
    console.error("Login error:", error);
    redirect("/error");
  }

  // Check if user exists in database, create if not
  if (authData.user) {
    const existingUser = await prisma.user.findUnique({
      where: { id: authData.user.id }
    });
    
    console.log("5. Existing user in DB:", existingUser);
    
    if (!existingUser) {
      console.log("6. User not in database, creating...");
      try {
        const createdUser = await prisma.user.create({
          data: {
            id: authData.user.id,
            email: authData.user.email!,
            name: authData.user.email!.split("@")[0],
          },
        });
        console.log("7. Created user in database:", createdUser);
      } catch (dbError) {
        console.error("8. Error creating user in database:", dbError);
      }
    }
  }
  console.log("=== End Login Debug ===");

  revalidatePath("/", "layout");
  redirect("/account");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  console.log("=== Signup Debug ===");
  console.log("1. Signup email:", data.email);

  const { data: authData, error } = await supabase.auth.signUp(data);

  console.log("2. Signup authData:", authData);
  console.log("3. Signup error:", error);
  console.log("4. User ID from auth:", authData?.user?.id);
  console.log("5. User email from auth:", authData?.user?.email);

  if (error) {
    console.error("Signup error:", error);
    redirect("/error");
  }

  // Create user record in database
  if (authData.user) {
    try {
      const createdUser = await prisma.user.create({
        data: {
          id: authData.user.id,
          email: authData.user.email!,
          name: authData.user.email!.split("@")[0],
        },
      });
      console.log("6. Created user in database:", createdUser);
    } catch (dbError) {
      console.error("7. Error creating user in database:", dbError);
      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { id: authData.user.id }
      });
      console.log("8. Existing user check:", existingUser);
    }
  }
  console.log("=== End Signup Debug ===");

  revalidatePath("/", "layout");
  redirect("/account");
}
