import Link from "next/link";
import Head from "next/head";
import { useSpaceTrader } from "@/context/SpaceTraderContext";
import { Button } from "@mui/material";

export function Navbar() {
  const { agent, selectedShip } = useSpaceTrader()
  return (
    <header className="@w-full @relative @z-30">
      <Head>
        <title>Wipple's Space Traders UI</title>
        <link rel="icon" href="/logo-over-black.svg" />
      </Head>
      <nav className="@flex @h-full @justify-between @bg-gray-800 @mx-auto @px-3">
        <div className="@flex">
          <Button >
            <Link className="@px-3" href="/">
              <p>Home</p>
            </Link>
          </Button>

          <Button>
            <Link className="@px-3" href="/agent">
              <p>Agent</p>
            </Link>
          </Button>

          <Button>
            <Link className="@px-3" href="/ships">
              <p>Ships</p>
            </Link>

          </Button>
          <Button>
            <Link className="@px-3" href="/waypoint">
              <p>Waypoints</p>
            </Link>
          </Button>

          <Button>
            <Link className="@px-3" href="/systems">
              <p>Systems</p>
            </Link>
          </Button>

          <Button>
            <Link className="@px-3" href="/factions">
              <p>Factions</p>
            </Link>
          </Button>

          <Button>
            <Link className="@px-3" href="/contracts">
              <p>Contracts</p>
            </Link>
          </Button>

          <Button>
            <Link className="@px-3" href="/fleetManager">
              <p>Fleet</p>
            </Link>
          </Button>
        </div>

        <div className="@flex @justify-end @items-center">
          <div className="@mx-2">
            {agent?.symbol}
          </div>
          <div className="@mx-2">
            {agent?.headquarters}
          </div>
          <div className="@mx-2">
            {selectedShip?.symbol}
          </div>
        </div>
      </nav>
    </header>
  );
}
