import { Ship } from "spacetraders-sdk";
import ContentPane from "./ContentPane";

interface Props {
  ship: Ship
}

export default function ShipCard({ship}: Props) {
  return (
    <template>
      <ContentPane title={ship.symbol}>
        <div>test</div>
      </ContentPane>
    </template>
  )
}