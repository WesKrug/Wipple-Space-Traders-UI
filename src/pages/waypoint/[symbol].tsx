import ContentPane from "@/components/organisms/ContentPane";
import WaypointCard from "@/components/molecules/WaypointCard";
import { getShipyardAsync, getWaypointAsync, purchaseShipAsync } from "@/utils/spaceTradersApi";
import { useEffect, useState } from "react";
import { ShipType, Shipyard, ShipyardShipTypesInner, Waypoint } from 'spacetraders-sdk'
import { useRouter } from "next/router";
import { TooltipChip } from "@/components/molecules/TooltipChip";

enum PageSection {
  Info,
  Shipyard
} 

export default function WaypointDetailsPage() {
  const [waypoint, setWaypoint] = useState<Waypoint>()
  const [pageSection, setPageSection] = useState<PageSection>(PageSection.Info)
  const [shipyard, setShipyard] = useState<Shipyard>()
  const [purchaseShipResponse, setPurchaseShipResponse] = useState<string>()
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return
    getWaypointAsync(router.query.symbol as string).then((resp) => { setWaypoint(resp) })
  }, [router.isReady])

  useEffect(() => {
    if (!router.isReady || shipyard) return
    getShipyardAsync(router.query.symbol as string).then((resp) => { setShipyard(resp) })
  }, [pageSection])

  const handlePurchaseShip = (shipType: ShipyardShipTypesInner) => {
    purchaseShipAsync(shipType.type!, router.query.symbol as string).then((resp) => {setPurchaseShipResponse(JSON.stringify(resp,null,4))})
  }

  return (
    <div>
      <div className="@flex @absolute @inset-y-0 @left-0 @w-16 @mt-7 @border-gray-50 @border-r-2">
          <div className="@flex @flex-col @justify-items-start @align-top @h-full @w-16 @bg-gray-500 ">
            <button onClick={() => {setPageSection(PageSection.Info)}}>
              <div className="@h-8 @w-12 @m-2 @text-center @bg-gray-600">
                Info
              </div>
            </button>
            
            {
              waypoint?.traits.find((trait) => trait.symbol === 'SHIPYARD') && 
              <button onClick={() => {setPageSection(PageSection.Shipyard)}}>
                <div className="@h-8 @w-12 @m-2 @text-center @bg-gray-600">
                  Ship
                </div>
              </button>
            } 
          </div>
      </div>
      {
        PageSection.Info === pageSection &&
        <section>
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
              {waypoint?.type} 
            </div>
        </div>
        {/*Orbiatls*/}
        { !!waypoint?.orbitals.length && <div className="@flex @my-2">
          <div className="@font-bold">
            Orbitals:                    
          </div>
          {
          waypoint?.orbitals.map((orbital,index) => {
            return (
            <div key={index} className=" @bg-slate-500 @mx-2 @px-2 @rounded-lg">
              {orbital.symbol}
            </div>
            )
          })}
        </div>
        }
        {/*Traits*/}
        { waypoint?.traits.length && <div className="@flex @my-2">
          <div className="@font-bold @self-center">
            Traits:                    
          </div>
          {
          waypoint?.traits.map((trait,index) => {
            return (
            <TooltipChip key={index} tooltipText={trait.description} chipText={trait.name}/>
            )
          })}
        </div>
        }
        </section>
      }
      {
        PageSection.Shipyard === pageSection &&
        <section>
          <ContentPane>
            <div>
              { !!shipyard?.shipTypes &&
                <div>
                <div className="@flex @flex-col @my-2 ">
                  <div className="@font-bold @self-center">
                    Available Ship Types:                
                  </div>
                  {
                  shipyard.shipTypes.map((shipType,index) => {
                    return (
                      <div key={index} className="@flex @flex-row @justify-between ">
                        <div className="@flex @flex-col @self-center @px-2 @w-[350px] @text-center">{shipType.type}</div>
                        <button className="@bg-gray-500 @my-2" onClick={() => {handlePurchaseShip(shipType)}}>
                          <div className="@px-2">
                            Purchase Ship
                          </div>  
                        </button>
                        
                      </div>
                    )
                  })}
                  </div>   
                </div>
              }
            </div>
          </ContentPane>
          <ContentPane>
            <pre>{JSON.stringify(purchaseShipResponse,null,4)}</pre>
          </ContentPane>
        </section>
      }
      
    </div>
  );
}  
