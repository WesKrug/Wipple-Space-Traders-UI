import ContentPane from "@/components/organisms/ContentPane";
import {
  Waypoint
} from 'spacetraders-sdk'
import { TooltipChip } from "./TooltipChip";
import ThemedCard from "../atoms/ThemedCard";
import Link from "next/link";
import { Button } from "@mui/material";
import { useSpaceTrader } from "@/context/SpaceTraderContext";
import { navigateShipToWaypoint } from "@/utils/spaceTradersApi";

const WAYPOINT_TYPE_EMOJI =
{
  "PLANET": "🌍",
  "GAS_GIANT": "☁",
  "MOON": "🌒",
  "ORBITAL_STATION": "🛰",
  "JUMP_GATE": "🚪",
  "ASTEROID_FIELD": "🪨",
  "NEBULA": "🌈",
  "DEBRIS_FIELD": "",
  "GRAVITY_WELL": ""
}

interface Props {
  waypoint: Waypoint;
}
const WaypointCard = ({ waypoint }: Props) => {
  const { agent, selectedShip, setSelectedShip } = useSpaceTrader()

  const getLink = (): string => {
    return `waypoint/${waypoint.symbol}`
  }

  const handleNavigateClick = () => {
    navigateShipToWaypoint(selectedShip!.symbol, waypoint.symbol)
  }

  return (
    <div>
      <div className="@m-4">
        <ThemedCard>
          <div className="@w-[600px] @h-[300px] @flex @flex-col @justify-between @overflow-y-auto">
            Waypoint Information
            <div className="@flex @justify-between @my-2">
              <div className="@font-bold @mr-4">
                Symbol:
              </div>
              <div className=" @text-right ">
                <Link href={getLink()}>
                  {waypoint?.symbol}
                </Link>
              </div>
            </div>
            <div className="@flex @justify-between @my-2">
              <div className="@font-bold">
                Faction:
              </div>
              <div className=" @text-right ">
                {waypoint?.faction?.symbol}
              </div>
            </div>
            <div className="@flex @justify-between @my-2">
              <div className="@font-bold">
                Type:
              </div>
              <div>
                {waypoint?.type} {WAYPOINT_TYPE_EMOJI[waypoint?.type]}
              </div>
            </div>
            {/*Orbiatls*/}
            {!!waypoint.orbitals.length && <div className="@flex @my-2">
              <div className="@font-bold">
                Orbitals:
              </div>
              {
                waypoint.orbitals.map((orbital, index) => {
                  return (
                    <div key={index} className=" @bg-slate-500 @mx-2 @px-2 @rounded-lg">
                      {orbital.symbol}
                    </div>
                  )
                })}
            </div>
            }
            {/*Traits*/}
            {!!waypoint.traits.length &&
              <div className="@flex @my-2">
                <div className="@font-bold @self-center">
                  Traits:
                </div>
                <div className="@grid @grid-cols-3">
                  {
                    waypoint.traits.map((trait, index) => {
                      return (
                        <TooltipChip key={index} chipText={trait.name}>
                          <div>{trait.description}</div>
                        </TooltipChip>
                      )
                    })}

                </div>
              </div>
            }
            {/*Actions*/}
            {!!waypoint.traits.length &&
              <div className="@flex @my-2">
                <div className="@font-bold @self-center">
                  Actions:
                </div>
                <div className="@grid @grid-cols-3">
                  <Button disabled={selectedShip === undefined} className="@bg-slate-800 @m-2" onClick={handleNavigateClick}>
                    <div>Navigate</div>
                  </Button>

                </div>
              </div>
            }
          </div>
        </ThemedCard>
      </div>
    </div>
  );
}

export default WaypointCard


