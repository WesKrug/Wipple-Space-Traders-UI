import ContentPane from "@/components/organisms/ContentPane";
import WaypointCard from "@/components/molecules/WaypointCard";
import { getSystemWaypointsAsync } from "@/utils/spaceTradersApi";
import { useState } from "react";
import { Waypoint } from 'spacetraders-sdk'

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
    <div className="@flex @flex-col @items-center @mx-10">
      <ContentPane title="System Information">
        <div className="@w-96">
          <div className="@mb-3 @pt-0">
          <input value={systemSymbol} onChange={handleInputUpdated} type="text" placeholder="" className="@px-2 @py-1 @text-blue-500 @relative @bg-white @rounded @text-sm @shadow @outline-none focus:@outline-none focus:@shadow-outline @w-full"/>
        </div>
        </div>
      </ContentPane>
      <button className="@mt-4 @w-48 @bg-blue-500 @rounded-lg @text-center hover:@bg-blue-900" onClick={handleGetWaypoint}>
        <p>Get Waypoint</p>
      </button>
      <div className="@flex @flex-wrap">
      {systemWaypoints && systemWaypoints.map((systemWaypoint,index) => {
        return (<WaypointCard key={index} waypoint={systemWaypoint}/>)
        }
      )}
      </div>
    </div>
  );
}

export default SystemsPage
  