import { AgentData } from "@/types/AgentTypes";
import {
  Configuration,
  AgentsApi,
  SystemsApi,
  Waypoint,
  Faction,
  Contract,
  Shipyard,
  Ship,
} from 'spacetraders-sdk'
import axios, { AxiosError } from "axios";
import { FactionsApi } from "spacetraders-sdk";
import { ContractsApi } from "spacetraders-sdk";
import { FleetApi } from "spacetraders-sdk";
import { GetShipyard200Response } from "spacetraders-sdk";
import { ShipType } from "spacetraders-sdk";
import { config } from "process";

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

const fleetApi = new FleetApi(configuration, undefined, instance)
const agentsApi = new AgentsApi(configuration, undefined, instance)
const systemsApi = new SystemsApi(configuration, undefined, instance)
const factionsApi = new FactionsApi(configuration, undefined, instance)
const contractsApi = new ContractsApi(configuration, undefined, instance)

export async function executeRequest<T>(request: () => T): Promise<T | undefined> {
  try {
    const response = await request();
    return response
  } catch (error) {
    if (error instanceof AxiosError) {
      
    } else {
      console.error('An error occurred:', error);
      return undefined
    }
  }
}


export async function getAgentAsync(): Promise<AgentData> {
  const agentResponse = await agentsApi.getMyAgent(options)

  return agentResponse.data.data
}

export async function getSystemWaypointsAsync(systemSymbol: string) {
  const systemWaypointsResponse = await systemsApi.getSystemWaypoints(systemSymbol)
  return systemWaypointsResponse.data.data
}

export async function getWaypointAsync(waypointSymbol: string): Promise<Waypoint> {
  const parts = waypointSymbol.split('-')
  const system = parts[0] + '-' + parts[1]
  const waypoint = parts[0] + '-' + parts[1] + '-' + parts[2]

  const waypointResposne = await systemsApi.getWaypoint(system, waypoint)
  return waypointResposne.data.data
}

export async function getAgentFactionsAsync(): Promise<Faction[]> {
  const factionResponse = await factionsApi.getFactions()
  return factionResponse.data.data
}

export async function getContractsAsync(): Promise<Contract[]> {
  const contractsResponse = await contractsApi.getContracts()
  return contractsResponse.data.data
}

export async function acceptContractAsync(id: string) {
  const contractsResponse = await contractsApi.acceptContract(id)
  return contractsResponse.data.data
}

export async function getContractAsync(id: string): Promise<Contract> {
  const contractsResponse = await contractsApi.getContract(id)
  return contractsResponse.data.data
}

export async function getShipsAsync(): Promise<Ship[]> {
  const response = await fleetApi.getMyShips()
  return response.data.data
}

export async function getShipAsync(shipSymbol: string): Promise<Ship> {
  const response = await fleetApi.getMyShip(shipSymbol)
  return response.data.data
}

export async function purchaseShipAsync(shipType: ShipType, waypointSymbol: string) {
  const response = await fleetApi.purchaseShip({ shipType, waypointSymbol })
  return response.data.data
}

export async function getShipyardAsync(waypointSymbol: string): Promise<Shipyard> {
  const parts = waypointSymbol.split('-')
  const system = parts[0] + '-' + parts[1]
  const waypoint = parts[0] + '-' + parts[1] + '-' + parts[2]

  const shipyardResponse = await systemsApi.getShipyard(system, waypoint)
  return shipyardResponse.data.data
}

export async function navigateShipToWaypoint(shipSymbol: string, waypointSymbol: string) {
  const resp = await executeRequest(() => fleetApi.navigateShip(shipSymbol, {waypointSymbol}))
  return resp
}

export async function extractResource(shipSymbol: string) {

}

export async function createSurvey(shipSymbol: string) {
  //fleetApi.createSurvey()
}