import ContentPane from "@/components/organisms/ContentPane"
import ShipCard from "@/components/organisms/ShipCard"
import { useSpaceTrader } from "@/context/SpaceTraderContext"
import { getShipsAsync } from "@/utils/spaceTradersApi"
import { useEffect, useState } from "react"
import { Ship } from "spacetraders-sdk"

export default function fleetManagerPage() {
  const {agent, selectedShip, setSelectedShip} = useSpaceTrader()
  const [ships, setShips] = useState<Ship[]>([])

  useEffect(() => {
    getShipsAsync().then((resp) => {setShips(resp)})
  },[])

  
  return (
    <ContentPane title="Ship Manager">
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
    </ContentPane>
)
}