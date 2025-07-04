"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavItems() {
  const pathname = usePathname();
  return (
    <nav>
      <ul className="flex items-center space-x-4">
        <li>
          <Link
            href="/"
            className={`${pathname === "/" ? "underline" : ""} p-4`}
          >
            トップ
          </Link>
        </li>
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
