import { Ship } from "spacetraders-sdk";
import ContentPane from "./ContentPane";
import ProgressBar from "../atoms/ProgressBar";
import { TooltipChip } from "../molecules/TooltipChip";
import { Button, Card, Checkbox, Divider } from "@mui/material";
import { SafetyDivider } from "@mui/icons-material";
import ThemedCard from "../atoms/ThemedCard";
import { useSpaceTrader } from "@/context/SpaceTraderContext";
import { useEffect, useState } from "react";
import { ShipNavStatus } from "spacetraders-sdk";
import { getShipAsync, getShipsAsync } from "@/utils/spaceTradersApi";

interface Props {
  ship: Ship
}

export default function ShipCard({ ship }: Props) {
  const [thisShip, setThisShip] = useState(ship)
  const { agent, selectedShip, setSelectedShip } = useSpaceTrader()
  const [isChecked, setIsChecked] = useState(selectedShip?.symbol == thisShip.symbol)
  const [currentTime, setCurrentTime] = useState(new Date())
  function getTimeDifference(): number {

    const arrivalTime = new Date(thisShip.nav.route.arrival)
    // const arrivalTimeMinutes = arrivalTime.getMinutes()
    // const arrivalTimeSeconds = arrivalTime.getSeconds()

    const currentTime = new Date()
    // const currentMinutes = currentTime.getUTCMinutes()
    // const currentSeconds = currentTime.getUTCMilliseconds()

    const differenceInMS = (arrivalTime.getTime() - currentTime.getTime())
    return (differenceInMS/1000) 
    // if (arrivalTime < currentTime) return "00:00"

    // const differenceMinutes = Math.max(arrivalTimeMinutes - currentMinutes, 0)
    // const differenceSeconds = Math.max(arrivalTimeSeconds - currentSeconds, 0)
    // const formattedDifference = `${differenceMinutes.toString().padStart(2, '0')}:${differenceSeconds.toString().padStart(2, '0')}`;
    // return formattedDifference;
  }

  useEffect(() => {
    console.log('1')
    const getArrival = setInterval(() => {
      setCurrentTime(new Date())
      if (getTimeDifference() < 0)
        getShipAsync(thisShip.symbol).then((resp) => setThisShip(resp))
        clearInterval(getArrival)
    }, 1000)
  }, [])

  const handleShipSelected = () => {
    if (!isChecked) {
      setSelectedShip(ship)
      setIsChecked(true)
    }
    else {
      setSelectedShip(undefined)
      setIsChecked(false)
    }
  }

  return (
    <div className="@m-4 @min-w-[600px]">
      <ThemedCard>
        <div>
          <div className="@flex @items-center">
            {thisShip.frame.name + ': ' + thisShip.symbol}
            <Checkbox checked={isChecked} onChange={handleShipSelected} inputProps={{ 'aria-label': 'controlled' }} />
          </div>
          <ThemedCard>
            <div className="@flex @flex-col @justify-center @items-center">
              Modules
              <div className="@grid @grid-cols-3">
                {
                  ship?.modules.map((module, index) => {
                    return (
                      <TooltipChip key={index} chipText={module.name}>
                        <div>{module.description}</div>
                      </TooltipChip>
                    )
                  })
                }
              </div>
            </div>
          </ThemedCard>

          {/* Mounts */}
          <ThemedCard>
            <div className="@flex @flex-col @justify-center @items-center">
              Mounts
              <div className="@grid @grid-cols-3">
                {
                  ship?.mounts.map((mounts, index) => {
                    return (
                      <TooltipChip key={index} chipText={mounts.name}>
                        <div>{mounts.description}</div>
                      </TooltipChip>
                    )
                  })
                }
              </div>
            </div>
          </ThemedCard>

          {/* Nav Data */}
          <ThemedCard>
            <div className="@flex @flex-col @justify-center">
              <p className=" @text-center">Nav Data</p>
              <div>
                <div className="@flex @flex-row @justify-between @mx-4">
                {thisShip.nav.status !== ShipNavStatus.InTransit &&
                    <div>
                      <ThemedCard>
                        <div>
                          <label className="@font-bold">Current System: </label>
                          <p>{thisShip.nav.waypointSymbol}</p>
                        </div>
                      </ThemedCard>
                    </div>
                  }
                  {thisShip.nav.status === ShipNavStatus.InTransit &&
                    <div>
                      <ThemedCard>
                        <div>
                          <label className="@font-bold">Previous System: </label>
                          <p>{thisShip.nav.route.departure.symbol}</p>
                        </div>
                      </ThemedCard>
                      <div className=" @align-middle">
                        <p>{getTimeDifference()}</p>
                      </div>
                      <ThemedCard>
                        <div>
                          <label className="@font-bold">Destination System: </label>
                          <p>{thisShip.nav.waypointSymbol}</p>
                        </div>
                      </ThemedCard>
                    </div>
                  }
                </div>
                <label className="@font-bold">Status</label>
                <p>{thisShip.nav.status}</p>
                <label className="@font-bold">Flight Mode</label>
                <p>{thisShip.nav.flightMode}</p>
              </div>
            </div>
          </ThemedCard>
          <label>Fuel Level</label>
          <ProgressBar currentValue={thisShip.fuel.current} maxValue={thisShip.fuel.capacity} />
          <label>Cargo Bay</label>
          <ProgressBar currentValue={thisShip.cargo.units} maxValue={thisShip.cargo.capacity} />
        </div>
      </ThemedCard>
    </div>
  )
} 