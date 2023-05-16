import { AgentData, AgentResponse } from "@/types/AgentTypes";
import { typedFetch } from "./fetchUtils";

export async function getAgentAsync(): Promise<AgentData> {
    const options = 
    {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SPACE_TOKEN}`
        },
    }

    const agentResponse = await typedFetch<AgentResponse>("https://api.spacetraders.io/v2/my/agent", options)

    return agentResponse.data
}