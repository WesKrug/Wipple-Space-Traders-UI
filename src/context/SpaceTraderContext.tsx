import { AgentData, AgentResponse } from "@/types/AgentTypes"
import { getAgentAsync } from "@/utils/spaceTradersApi"
import { ReactNode, createContext, useContext, useState } from "react"

type SpaceTraderContextType = {
    agent: AgentData | undefined
    setAgent: (agent: AgentData | undefined) => void
}

const spaceTraderContextDefaultValues: SpaceTraderContextType = {
    agent: {
        accountId: "",
        symbol: "",
        headquarters: "",
        credits: 0
    },
    setAgent: () => {}
}

const SpaceTraderContext = createContext<SpaceTraderContextType>(spaceTraderContextDefaultValues)

export function useSpaceTrader() {
    return useContext(SpaceTraderContext)
}

type ProviderProps = {
    children: ReactNode;
};

export function SpaceTraderProvider({children}: ProviderProps) {
    const [agentData, setAgentData] = useState<AgentData>()

    const setAgent = (agent: AgentData | undefined) => {
        setAgentData(agent)
    }

    if (!agentData) {
        getAgentAsync().then((resp) => {setAgentData(resp)})
    }
    
    const value = {
        agent: agentData,
        setAgent
    }
    return (
        <>
            <SpaceTraderContext.Provider value={value}>
                {children}
            </SpaceTraderContext.Provider>
        </>
    );
}
