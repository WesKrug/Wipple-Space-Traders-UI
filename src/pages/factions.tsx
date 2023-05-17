import ContentPane from "@/components/organisms/ContentPane";
import FactionCard from "@/components/organisms/FactionCard";
import { useSpaceTrader } from "@/context/SpaceTraderContext";
import { getAgentFactionsAsync } from "@/utils/spaceTradersApi";
import { Card, Container } from "@nextui-org/react";
import { useState } from "react";
import { Faction } from "spacetraders-sdk";

const FactionPage = () => {
  const {agent} = useSpaceTrader()
  const [factions, setFactions] = useState<Faction[]>()

  const handleGetFactions = async () => {
    const factionResponse = await getAgentFactionsAsync()
    setFactions(factionResponse)
  }

  // const handleInputUpdated = (e: any) => {
  //   setWaypointSymbol(e.target.value)
  // }

  return (
    <div className="@flex @flex-col @items-center">
      <button className="@mt-4 @w-48 @bg-blue-500 @rounded-lg @text-center hover:@bg-blue-900" onClick={handleGetFactions} >
        <p>Get Factions</p>
      </button>
      <div className="@flex @flex-wrap @items-center @justify-center">
      {
        factions && factions.map((faction,index) => {
          return (
          <FactionCard key={index} faction={faction}/>
          )
        })
      }
      </div>
      

      { factions && 
        <ContentPane>
          <pre>{JSON.stringify(factions,null,2)}</pre>
        </ContentPane>
      }

    </div>
  );
}

export default FactionPage
  