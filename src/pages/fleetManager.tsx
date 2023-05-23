import ContentPane from "@/components/organisms/ContentPane"
import ShipCard from "@/components/organisms/ShipCard"
import { useSpaceTrader } from "@/context/SpaceTraderContext"
import { getShipsAsync } from "@/utils/spaceTradersApi"
import { useEffect, useState } from "react"
import { Ship } from "spacetraders-sdk"
import SystemsPage from "./systems"
import { Button, Card, Drawer } from "@mui/material"

export default function fleetManagerPage() {
  const [ships, setShips] = useState<Ship[]>([])
  const [isShipDrawerOpen, setIsShipDrawerOpen] = useState(false)

  useEffect(() => {
    getShipsAsync().then((resp) => { setShips(resp) })
  }, [])

  const toggleDrawer =
    (open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setIsShipDrawerOpen(open);
    };
  return (
    <div>
      <SystemsPage />
      <Button className="@absolute @right-0 @top-8" onClick={toggleDrawer(true)}>Open Ships</Button>
      <Drawer anchor="bottom" open={isShipDrawerOpen} onClose={toggleDrawer(false)}>
        <Card className="@bg-gray-800 @max-h-[50vh] @p-2">
          <div className="@grid @grid-cols-3 @justify-center @max-h-[50vh] @overflow-y-auto">
            {ships && ships.map((ship, index) => {
              return (
                <ShipCard key={index} ship={ship} />
              )
            })}
          </div>
        </Card>
      </Drawer>
    </div>
  )
}