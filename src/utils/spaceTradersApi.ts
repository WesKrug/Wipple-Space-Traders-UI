import { AgentData, AgentResponse } from "@/types/AgentTypes";
import {
    Configuration,
    AgentsApi,
    SystemsApi,
    Waypoint,
  } from 'spacetraders-sdk'
import axios from "axios";
  
const configuration = new Configuration({
    basePath: process.env.NEXT_PUBLIC_BASE_PATH,
    accessToken: process.env.NEXT_PUBLIC_SPACE_TOKEN
})

const options = 
{
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SPACE_TOKEN}`
    },
}
const instance = axios.create(options)

export async function getAgentAsync(): Promise<AgentData> {
    const agentsApi = new AgentsApi(configuration, undefined, instance)

    const agentResponse = await agentsApi.getMyAgent(options)

    return agentResponse.data.data
}

export async function getWaypointAsync(system: string, waypoint: string): Promise<Waypoint> {
    const systemsApi = new SystemsApi(configuration, undefined, instance)
    const waypointResposne = await systemsApi.getWaypoint(system, waypoint)
    return waypointResposne.data.data
}