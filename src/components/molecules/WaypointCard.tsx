import ContentPane from "@/components/organisms/ContentPane";
import {
    Waypoint
  } from 'spacetraders-sdk'
import { TooltipChip } from "./Tooltip";

const WAYPOINT_TYPE_EMOJI = 
{
  "PLANET": "🌍",
  "GAS_GIANT": "☁",
  "MOON": "🌒", 
  "ORBITAL_STATION": "🛰", 
  "JUMP_GATE": "🚪", 
  "ASTEROID_FIELD": "🪨", 
  "NEBULA": "🌈", 
  "DEBRIS_FIELD": "", 
  "GRAVITY_WELL": ""
}

interface Props {
    waypoint: Waypoint;
  }
const WaypointCard = ({waypoint}: Props) => {

  const getLink = (): string => {
    return `waypoint/${waypoint.symbol}`
  }
  return (
    <div>
      <div className="@flex-col">
        <ContentPane title="Waypoint Information" link={getLink()}>
            <div className="@flex @flex-col">
                <div className="@flex @justify-between @my-2">
                    <div className="@font-bold @mr-4">
                        Symbol:  
                    </div>
                    <div className=" @text-right ">
                      {waypoint?.symbol}
                    </div>
                </div>
                <div className="@flex @justify-between @my-2">
                    <div className="@font-bold">
                        Faction:  
                    </div>
                    <div className=" @text-right ">
                      {waypoint?.faction?.symbol}
                    </div>
                </div>
                <div className="@flex @justify-between @my-2">
                    <div className="@font-bold">
                        Type:  
                    </div>
                    <div>
                      {waypoint?.type} {WAYPOINT_TYPE_EMOJI[waypoint?.type]}
                    </div>
                </div>
                {/*Orbiatls*/}
                { !!waypoint.orbitals.length && <div className="@flex @my-2">
                  <div className="@font-bold">
                    Orbitals:                    
                  </div>
                  {
                  waypoint.orbitals.map((orbital,index) => {
                    return (
                    <div key={index} className=" @bg-slate-500 @mx-2 @px-2 @rounded-lg">
                      {orbital.symbol}
                    </div>
                    )
                  })}
                </div>
                }
                {/*Traits*/}
                { !!waypoint.traits.length &&
                  <div className="@flex @my-2">
                  <div className="@font-bold @self-center">
                    Traits:                    
                  </div>
                  {
                  waypoint.traits.map((trait,index) => {
                    return (
                    <TooltipChip key={index} tooltipText={trait.description} chipText={trait.name}/>
                    )
                  })}
                </div>
                }
            </div>
        </ContentPane>
      </div>
    </div>
  );
}

export default WaypointCard
  

