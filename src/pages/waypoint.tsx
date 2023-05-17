import ContentPane from "@/components/organisms/ContentPane";
import WaypointCard from "@/components/molecules/WaypointCard";
import { getWaypointAsync } from "@/utils/spaceTradersApi";
import { useState } from "react";
import { Waypoint } from 'spacetraders-sdk'

const WaypointPage = () => {
  const [waypoint, setWaypoint] = useState<Waypoint>()
  const [waypointSymbol, setWaypointSymbol] = useState<string>('')
  const [orbitals, setOrbitals] = useState<Waypoint[]>([])

  const handleGetWaypoint = async () => {
    setWaypoint(undefined)
    setOrbitals([])

    const waypointResponse = await getWaypointAsync(waypointSymbol)
    setWaypoint(waypointResponse)

    var orbitalDetails: Waypoint[] = []
    await Promise.all(waypointResponse.orbitals.map(async (orbital) => {
      
      const orbitalDetail = await getWaypointAsync(orbital.symbol)
      orbitalDetails = [...orbitalDetails, orbitalDetail]
    }))
    setOrbitals(orbitalDetails)
  }

  const handleInputUpdated = (e: any) => {
    setWaypointSymbol(e.target.value)
  }

  return (
    <div className="@flex @flex-col @items-center">
      <ContentPane title="Waypoint Information">
        <div className="@w-96">
          <div className="@mb-3 @pt-0">
          <input value={waypointSymbol} onChange={handleInputUpdated} type="text" placeholder="" className="@px-2 @py-1 @text-blue-500 @relative @bg-white @rounded @text-sm @shadow @outline-none focus:@outline-none focus:@shadow-outline @w-full"/>
        </div>
        </div>
      </ContentPane>
      <button className="@mt-4 @w-48 @bg-blue-500 @rounded-lg @text-center hover:@bg-blue-900" onClick={handleGetWaypoint}>
        <p>Get Waypoint</p>
      </button>
      {waypoint && <WaypointCard waypoint={waypoint} />}
      <div className="@flex @flex-row">
      {orbitals && orbitals.map((orbital,index) => {
        return (<WaypointCard key={index} waypoint={orbital}/>)
        }
      )}
      </div>
    </div>
  );
}

export default WaypointPage
  