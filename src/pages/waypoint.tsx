import ContentPane from "@/components/organisms/ContentPane";
import { TooltipChip } from "@/components/molecules/Tooltip";
import WaypointCard from "@/components/molecules/WaypointCard";
import { useSpaceTrader } from "@/context/SpaceTraderContext";
import { getWaypointAsync } from "@/utils/spaceTradersApi";
import { useState } from "react";
import { Waypoint } from 'spacetraders-sdk'

const WaypointPage = () => {
  const {agent} = useSpaceTrader()
  const [waypoint, setWaypoint] = useState<Waypoint>()
  const [waypointSymbol, setWaypointSymbol] = useState<string>('')

  const handleGetWaypoint = async () => {
    const parts = waypointSymbol.split('-')
    const waypointResponse = await getWaypointAsync(parts[0]+'-'+parts[1], parts[0]+'-'+parts[1]+'-'+parts[2])
    setWaypoint(waypointResponse)
  }

  const handleInputUpdated = (e: any) => {
    setWaypointSymbol(e.target.value)
  }

  return (
    <div className="@flex @flex-col @items-center">
      <ContentPane>
        <div className="@w-96">
          <h1 className="@text-center">Waypoint Information</h1>
          <div className="@mb-3 @pt-0">
          <input value={waypointSymbol} onChange={handleInputUpdated} type="text" placeholder="Small Input" className="@px-2 @py-1 @text-blue-500 @relative @bg-white @rounded @text-sm @shadow @outline-none focus:@outline-none focus:@shadow-outline @w-full"/>
        </div>
        </div>
      </ContentPane>
      <button className="@mt-4 @w-48 @bg-blue-500 @rounded-lg @text-center hover:@bg-blue-900" onClick={handleGetWaypoint}>
        <p>Get Waypoint</p>
      </button>
      {waypoint && <WaypointCard waypoint={waypoint}></WaypointCard>}

        {/* <ContentPane>
          <pre>{JSON.stringify(waypoint,null,2)}</pre>
        </ContentPane> */}
    </div>
  );
}

export default WaypointPage
  