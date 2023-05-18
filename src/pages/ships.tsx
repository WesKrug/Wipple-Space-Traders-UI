import ContentPane from "@/components/organisms/ContentPane";
import WaypointCard from "@/components/molecules/WaypointCard";
import { getSystemWaypointsAsync } from "@/utils/spaceTradersApi";
import { useState } from "react";
import { Waypoint } from 'spacetraders-sdk'
import { useSpaceTrader } from "@/context/SpaceTraderContext";
import { Button, Dropdown } from "@nextui-org/react";
import { ShipType } from "spacetraders-sdk";

const ShipsPage = () => {
  const {agent} = useSpaceTrader()
  const [shipName, updateShipName] = useState('')
  const [shipyardWaypoint, updateShipyardWaypoint] = useState('')


  type DropdownItem = {
    key: string,
    name: string
  }
  var shipTypes:DropdownItem[] = []
  for (const property in ShipType)
    shipTypes = [...shipTypes, {key: ShipType[property] , name: property}]

  const onSelectionChange = (e: any) => {
    updateShipName(e.currentKey)
  }

  const handleInputUpdated = (e: any) => {
    updateShipyardWaypoint(e.target.value)
  }
  const handlePurchaseShip = () => {
    console.log()
  }

  return (
    <div className="@flex @flex-col @items-center @mx-10">
      <ContentPane title="Ship Manager">
        <div className="@w-96">
          <div className="@mb-3 @pt-0">
            <label>Select a Ship Type</label>
            <Dropdown>
              <Dropdown.Button className="@w-48 @bg-blue-600 @rounded-lg @text-center hover:@bg-blue-900 @mb-4" >{shipName}</Dropdown.Button>
              <Dropdown.Menu aria-label="Dynamic Actions" items={Object.entries(ShipType).map((key,value) => {return {name:key,key:value}})} disallowEmptySelection selectionMode="single" selectedKeys={shipName} onSelectionChange={onSelectionChange}>
              {(item: any) => (
                <Dropdown.Item key={item.key} color={item.key === "delete" ? "error" : "default"} >
                  {item.name}
                </Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
          <label >Shipyard Waypoint</label>
          <input value={shipyardWaypoint} onChange={handleInputUpdated} type="text" placeholder="" className="@px-2 @py-1 @text-blue-500 @relative @bg-white @rounded @text-sm @shadow @outline-none focus:@outline-none focus:@shadow-outline @w-full"/>
        </div>
        </div>
      </ContentPane>
      <Button className="@mt-4 @w-48 @bg-blue-600 @rounded-lg @text-center hover:@bg-blue-900" onClick={handlePurchaseShip}>Purchase Ship</Button>
    </div>
  );
}

export default ShipsPage
  