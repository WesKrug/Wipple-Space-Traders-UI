import { getAgentAsync } from "@/utils/spaceTradersApi"
import { ReactNode, createContext, useContext, useState } from "react"
import { Agent, Ship } from "spacetraders-sdk"

type SpaceTraderContextType = {
  agent: Agent | undefined
  setAgent: (agent: Agent | undefined) => void
  selectedShip: Ship | undefined;
  setSelectedShip: (ship: Ship | undefined) => void;

}

const spaceTraderContextDefaultValues: SpaceTraderContextType = {
  agent: undefined,
  setAgent: () => { },
  selectedShip: undefined,
  setSelectedShip: () => { }
}

const SpaceTraderContext = createContext<SpaceTraderContextType>(spaceTraderContextDefaultValues)

export function useSpaceTrader() {
  return useContext(SpaceTraderContext)
}

type ProviderProps = {
  children: ReactNode;
};

export function SpaceTraderProvider({ children }: ProviderProps) {
  const [agent, setAgent] = useState<Agent | undefined>()
  const [selectedShip, setSelectedShip] = useState<Ship | undefined>()

  if (!agent) {
    getAgentAsync().then((resp) => { setAgent(resp) })
  }

  const value = {
    agent,
    setAgent,
    selectedShip,
    setSelectedShip
  }
  return (
    <SpaceTraderContext.Provider value={value}>
      {children}
    </SpaceTraderContext.Provider>
  );
}
