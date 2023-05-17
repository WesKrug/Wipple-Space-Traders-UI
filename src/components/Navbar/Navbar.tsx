import Link from "next/link";
import Head from "next/head";
import { useSpaceTrader } from "@/context/SpaceTraderContext";

export function Navbar() {
  const {agent} = useSpaceTrader()
  return (
    <header className="@w-full @relative @z-30">
      <Head>
        <title>Wipple's Space Traders UI</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className="@flex @h-full @justify-between @bg-gray-800 @mx-auto @px-3">
        <div className="@flex">
          <Link className="@px-3" href="/">
            <p>Home</p>
          </Link>
          <Link className="@px-3" href="/agent">
            <p>Agent</p>
          </Link>
          <Link className="@px-3" href="/waypoint">
            <p>Waypoints</p>
          </Link>
          <Link className="@px-3" href="/factions">
            <p>Factions</p>
          </Link>
          <Link className="@px-3" href="/contracts">
            <p>Contracts</p>
          </Link>
        </div>
        
        <div className="">
          {agent?.symbol}
        </div>
      </nav>
    </header>
  );
}
