import ContentPane from "@/components/organisms/ContentPane";
import { Faction } from 'spacetraders-sdk'
import { TooltipChip } from "../molecules/Tooltip";


interface Props {
    faction: Faction;
  }
const FactionCard = ({faction}: Props) => {
  return (
    <div>
      <div className="@flex-col">
        <ContentPane title="Faction Information">
            <div className="@flex @flex-col">
                <div className="@flex @justify-between @my-2">
                    <div className="@font-bold">
                        Symbol:  
                    </div>
                    <div className=" @text-right ">
                      {faction.symbol}
                    </div>
                </div>
                <div className="@flex @justify-between @my-2">
                    <div className="@font-bold">
                        Name:  
                    </div>
                    <div>
                      {faction.name}
                    </div>
                </div>
                <div className="@flex @justify-between @my-2">
                    <div className="@font-bold">
                        Headquarters:  
                    </div>
                    <div>
                      {faction.headquarters}
                    </div>
                </div>
                {/*Traits*/}
                <div className="@flex @my-2">
                  <div className="@font-bold @self-center">
                    Traits:                    
                  </div>
                  {
                  faction.traits.map((trait,index) => {
                    return (
                    <TooltipChip key={index} tooltipText={trait.description} chipText={trait.name}/>
                    )
                  })}
                </div>
            </div>
        </ContentPane>
      </div>
    </div>
  );
}

export default FactionCard
  

