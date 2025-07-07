import Link from "next/link";
import { Button } from "../ui/button";
import NavItems from "./nav-items";
import { createClient } from "@/utils/supabase/server";

export default async function HeaderGate() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <div>
      <header className="flex items-center w-full justify-between px-6 py-4 bg-white shadow-sm sticky top-0 z-50">
        <h1 className="text-2xl font-bold text-gray-900">
          <Link href="/">StreamLearn</Link>
        </h1>
        {user ? (
          <NavItems />
        ) : (
          <div className="flex items-center space-x-2">
            <Button variant="secondary">
              <Link href="/login">ログイン</Link>
            </Button>
            <Button>
              <Link href="/create-account">新規登録</Link>
            </Button>
          </div>
        )}
      </header>
    </div>
  );
}
