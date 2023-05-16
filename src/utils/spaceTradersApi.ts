import { AgentData, AgentResponse } from "@/types/AgentTypes";
import {
    Configuration,
    AgentsApi,
    SystemsApi,
    Waypoint,
    Faction,
  } from 'spacetraders-sdk'
import axios from "axios";
import { FactionsApi } from "spacetraders-sdk";
  
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

export async function getAgentFactionAsync(): Promise<Faction[]> {
    const factionsApi = new FactionsApi(configuration, undefined, instance)
    const factionResponse = await factionsApi.getFactions()
    return factionResponse.data.data
}