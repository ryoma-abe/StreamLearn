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
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold tracking-tight sm:text-2xl">StreamLearn</span>
          </Link>
        </div>
        
        <nav className="flex items-center gap-4">
          {user ? (
            <NavItems />
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">ログイン</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/signup">新規登録</Link>
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
