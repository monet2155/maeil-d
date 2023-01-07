import Link from "next/link";

export default function Header() {
  return (
    <header className="flex flex-row justify-between p-10 bg-sky-300">
      <nav>
        <ul>
          <li>
            <Link href="/topic/list">주제</Link>
          </li>
        </ul>
      </nav>
      <button>로그인</button>
    </header>
  );
}
