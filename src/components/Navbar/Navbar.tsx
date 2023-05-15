import Link from "next/link";

export function Navbar() {

  return (
    <header className="@w-full @relative @z-30">
      <nav className="@flex @h-full @items-center @bg-gray-800 @mx-auto @px-3">
        <Link className="@px-3" href="/">
          <p>home</p>
        </Link>
        <Link className="@px-3" href="/test">
          <p>test</p>
        </Link>
      </nav>
    </header>
  );
}
