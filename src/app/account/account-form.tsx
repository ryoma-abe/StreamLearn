import { prisma } from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";

export default async function AccountForm() {
  const supabase = await createClient();

  // ここで現在ログインしているユーザーの情報を取得
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Prismaとログインユーザーの紐付け
  const dbUser = user
    ? await prisma.user.findUnique({
        where: { email: user.email! },
      })
    : null;

  return (
    <div className="rounded-lg border p-6">
      <h3 className="mb-4">アカウント情報</h3>
      <div className="max-w-md mx-auto p-6 space-y-4">
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            type="text"
            value={dbUser?.email}
            disabled
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            名前
          </label>
          <input
            id="name"
            type="text"
            value={dbUser?.name ?? ""}
            disabled
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
          />
        </div>
      </div>
    </div>
  );
}
