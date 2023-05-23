import ContentPane from "@/components/organisms/ContentPane";
import WaypointCard from "@/components/molecules/WaypointCard";
import { getSystemWaypointsAsync } from "@/utils/spaceTradersApi";
import { useState } from "react";
import { Waypoint } from 'spacetraders-sdk'
import { Button } from "@mui/material";

const SystemsPage = () => {
  const [systemWaypoints, setSystemWaypoints] = useState<Waypoint[]>()
  const [systemSymbol, setSystemSymbol] = useState<string>('')

  const handleGetWaypoint = async () => {
    setSystemWaypoints(undefined)

    const systemWaypointsResponse = await getSystemWaypointsAsync(systemSymbol)
    setSystemWaypoints(systemWaypointsResponse)
  }

  const handleInputUpdated = (e: any) => {
    setSystemSymbol(e.target.value)
  }

  return (
    <div className="@flex @flex-col @items-center @mx-10 @overflow-auto">
      <ContentPane title="System Information">
        <div className="@w-96">
          <div className="@mb-3 @pt-0">
          <input value={systemSymbol} onChange={handleInputUpdated} type="text" placeholder="" className="@px-2 @py-1 @text-blue-500 @relative @bg-white @rounded @text-sm @shadow @outline-none focus:@outline-none focus:@shadow-outline @w-full"/>
        </div>
        </div>
      </ContentPane>
      <Button onClick={handleGetWaypoint}>
        <p>Get Waypoint</p>
      </Button>
      <div className="@grid @grid-cols-3">
      {systemWaypoints && systemWaypoints.map((systemWaypoint,index) => {
        return (<WaypointCard key={index} waypoint={systemWaypoint}/>)
        }
      )}
      </div>
    </div>
  );
}

export default SystemsPage
  