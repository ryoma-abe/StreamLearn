import Link from "next/link";
import { Button } from "../ui/button";

export default function Header() {
  return (
    <header className="flex items-center px-6 py-4 bg-white shadow-sm">
      <h1 className="text-2xl font-bold text-gray-900">StreamLearn</h1>
      <nav className="flex-1 flex justify-center">
        <ul className="flex items-center space-x-4">
          <li>
            <Link href="/courses">コース一覧</Link>
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
