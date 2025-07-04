"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="flex items-center px-6 py-4 bg-white shadow-sm">
      <h1 className="text-2xl font-bold text-gray-900">
        <Link href="/">StreamLearn</Link>
      </h1>
      <nav className="flex-1 flex justify-center">
        <ul className="flex items-center space-x-4">
          <li>
            <Link
              href="/courses"
              className={`${pathname === "/courses" ? "underline" : ""} p-4`}
            >
              コース一覧
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard"
              className={`${pathname === "/dashboard" ? "underline" : ""} p-4`}
            >
              ダッシュボード
            </Link>
          </li>
        </ul>
      </nav>
      <div className="flex items-center space-x-2">
        <Button variant="secondary">ログイン</Button>
        <Button>新規登録</Button>
      </div>
    </header>
  );
}
