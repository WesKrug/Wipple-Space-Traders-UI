import ContentPane from "@/components/ContentPane";
import { useSpaceTrader } from "@/context/SpaceTraderContext";

const AgentPage = () => {
  const {agent} = useSpaceTrader()

  return (
    <div>
      <ContentPane>
        <div className="@w-96">
          <h1 className="@text-center">Agent Information</h1>
          <div className="@flex @flex-col">
            <div className="@flex @justify-between @flex-row">
              <p className="@pr-4">Account Id:</p>
              <p>{agent?.accountId}</p>
            </div>
            <div className="@flex @justify-between @flex-row">
              <p className="@pr-4">Symbol:</p>
              <p>{agent?.symbol}</p>
            </div>
            <div className="@flex @justify-between @flex-row">
              <p className="@pr-4">Headquaters:</p>
              <p>{agent?.headquarters}</p>
            </div>
            <div className="@flex @justify-between @flex-row">
              <p className="@pr-4">Credits:</p>
              <p>{agent?.credits}</p>
            </div>
          </div>
        </div>
      </ContentPane>
      <button className="@mt-4 @w-48 @bg-blue-500 @rounded-lg @text-center hover:@bg-blue-900" >
        <p>Get Agent</p>
      </button>
    </div>
  );
}

export default AgentPage
  