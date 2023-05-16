import Link from "next/link";
import Head from "next/head";

export function Navbar() {

  return (
    <header className="@w-full @relative @z-30">
      <Head>
        <title>Wipple's Space Traders UI</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className="@flex @h-full @items-center @bg-gray-800 @mx-auto @px-3">
        <Link className="@px-3" href="/">
          <p>Home</p>
        </Link>
        <Link className="@px-3" href="/agent">
          <p>Agent</p>
        </Link>
      </nav>
    </header>
  );
}
