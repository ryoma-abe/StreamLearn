"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function NavItems() {
  const pathname = usePathname();
  
  const navItems = [
    { href: "/", label: "トップ" },
    { href: "/courses", label: "コース一覧" },
    { href: "/account", label: "アカウント" },
  ];
  
  return (
    <nav>
      <ul className="flex items-center gap-1">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={cn(
                "px-3 py-2 text-sm font-medium transition-colors hover:text-foreground",
                pathname === item.href
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
