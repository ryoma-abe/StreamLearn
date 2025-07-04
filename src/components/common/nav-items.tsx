"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavItems() {
  const pathname = usePathname();
  return (
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
        {/* アカウントページ */}
        <li>
          <Link
            href="/account"
            className={`${pathname === "/account" ? "underline" : ""} p-4`}
          >
            アカウント
          </Link>
        </li>
      </ul>
    </nav>
  );
}
