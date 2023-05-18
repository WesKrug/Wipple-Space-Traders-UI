import ContentPane from "@/components/organisms/ContentPane";
import WaypointCard from "@/components/molecules/WaypointCard";
import { getWaypointAsync } from "@/utils/spaceTradersApi";
import { useEffect, useState } from "react";
import { Waypoint } from 'spacetraders-sdk'
import { useRouter } from "next/router";

const WaypointDetailsPage = () => {
  const [waypoint, setWaypoint] = useState<Waypoint>()
  const [waypointSymbol, setWaypointSymbol] = useState<string>('')
  const [orbitals, setOrbitals] = useState<Waypoint[]>([])
  const router = useRouter();
  useEffect(() => {
    if (!router.isReady) return
    getWaypointAsync(router.query.symbol as string).then((resp) => {    setWaypoint(resp)
    })
  }, [router.isReady])

  const handleGetWaypoint = async () => {
    setWaypoint(undefined)
    setOrbitals([])
  }

  return (
    <div className="@flex @flex-col @items-center">
      <ContentPane title="Waypoint Information">
        <div>
          {router.query.symbol}
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

export default WaypointDetailsPage
  