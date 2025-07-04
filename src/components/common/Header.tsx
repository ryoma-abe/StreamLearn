import { Button } from "../ui/button";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
      <h1 className="text-2xl font-bold text-gray-900">StreamLearn</h1>
      <nav>
        <ul className="flex items-center space-x-4">
          <li>
            <Button variant="secondary">ログイン</Button>
          </li>
          <li>
            <Button>新規登録</Button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
