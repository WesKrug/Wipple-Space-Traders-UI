interface AgentData {
    accountId: string;
    symbol: string;
    headquarters: string;
    credits: number;  
}

interface AgentResponse {
    data: AgentData
}

export type {AgentData, AgentResponse}