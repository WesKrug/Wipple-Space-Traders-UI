import { Ship } from "spacetraders-sdk";
import ContentPane from "./ContentPane";
import ProgressBar from "../atoms/ProgressBar";

interface Props {
  ship: Ship
}

export default function ShipCard({ ship }: Props) {


  function getTimeDifference(): string {
    const arrivalTime = new Date(ship.nav.route.arrival)
    const arrivalTimeMinutes = arrivalTime.getMinutes()
    const arrivalTimeSeconds = arrivalTime.getSeconds()

    const currentTime = new Date()
    const currentMinutes = currentTime.getUTCMinutes()
    const currentSeconds = currentTime.getUTCMilliseconds()

    const differenceMinutes = Math.max(arrivalTimeMinutes - currentMinutes, 0)
    const differenceSeconds = Math.max(arrivalTimeSeconds - currentSeconds, 0)
    const formattedDifference = `${differenceMinutes.toString().padStart(2, '0')}:${differenceSeconds.toString().padStart(2, '0')}`;
    return formattedDifference;
  }
  

  return (
    <div>
      <ContentPane title={ship.symbol}>
        <div>
          <ContentPane title="Nav Data">
            <div>
              <p>{new Date(ship.nav.route.arrival).toUTCString()}</p>
              <p>{getTimeDifference()}</p>
              <div className="@flex @flex-col">
                <label className="@font-bold">Previous System: </label>
                <p>{ship.nav.route.departure.symbol}</p>
                <label className="@font-bold">Destination System: </label>
                <p>{ship.nav.waypointSymbol}</p>
              </div>

              <label className="@font-bold">Status</label>
              <p>{ship.nav.status}</p>
              <label className="@font-bold">Flight Mode</label>
              <p>{ship.nav.flightMode}</p>
            </div>
          </ContentPane>
          <label>Fuel Level</label>
          <ProgressBar currentValue={ship.fuel.current} maxValue={ship.fuel.capacity} />
        </div>
      </ContentPane>
    </div>
  )
} 