import ContentPane from "@/components/organisms/ContentPane";
import { getShipsAsync, getSystemWaypointsAsync } from "@/utils/spaceTradersApi";
import { useEffect, useState } from "react";
import { Ship, Waypoint } from 'spacetraders-sdk'
import { useSpaceTrader } from "@/context/SpaceTraderContext";
import { ShipType } from "spacetraders-sdk";
import ShipCard from "@/components/organisms/ShipCard";

export default function FleetManagerPage() {
  const {agent} = useSpaceTrader()
  const [ships, setShips] = useState<Ship[]>([])

  useEffect(() => {
    getShipsAsync().then((resp) => {setShips(resp)})
  },[])


  return (
    <div className="@flex @flex-col @items-center @mx-10">
        <div className="">
          <div className="@mb-3 @pt-0">
            {ships && ships.map((ship, index) => {
              return (
              <ShipCard key={index} ship={ship}/>
              )
            })} 
            {/* <pre>{JSON.stringify(ships,undefined,4)}</pre> */}
          </div>
        </div>
    </div>
  );
}
  