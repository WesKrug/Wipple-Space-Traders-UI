import ContentPane from "@/components/ContentPane";
import { useSpaceTrader } from "@/context/SpaceTraderContext";

const WaypointPage = () => {
  const {agent} = useSpaceTrader()

  const handleGetWaypoint = () => {

  }

  return (
    <div>
      <ContentPane>
        <div className="@w-96">
          <h1 className="@text-center">Waypoint Information</h1>
          <div className="@flex @flex-col">
            <input type="text" className="@bg-black"></input>
          </div>
        </div>
      </ContentPane>
      <button className="@mt-4 @w-48 @bg-blue-500 @rounded-lg @text-center hover:@bg-blue-900" onClick={handleGetWaypoint}>
        <p>Get Waypoint</p>
      </button>
    </div>
  );
}

export default WaypointPage
  