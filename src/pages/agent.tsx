import ContentPane from "@/components/ContentPane";
import { useSpaceTrader } from "@/context/SpaceTraderContext";
import { AgentData, AgentResponse } from "@/types/AgentTypes";
import { api } from "@/utils/fetchUtils";
import { AxiosRequestConfig } from "axios";
import useAxios from "axios-hooks";
import { useState } from "react";

const AgentPage = () => {
  const {agent, setAgent} = useSpaceTrader()
  const config: AxiosRequestConfig = {
    baseURL: "https://api.spacetraders.io/v2",
    url: "/my/agent",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SPACE_TOKEN}`
    },
  }
  const [{ data, loading, error }] = useAxios<AgentResponse>(config);
  setAgent(data?.data)
    return (
      <div>
        <ContentPane>
          <div className="@w-96">
            <h1 className="@text-center">Agent Information</h1>
            <div className="@flex @flex-col">
              <div className="@flex @justify-between @flex-row">
                <p className="@pr-4">Account Id:</p>
                <p>{agent?.accountId}</p>
              </div>
              <div className="@flex @justify-between @flex-row">
                <p className="@pr-4">Symbol:</p>
                <p>{agent?.symbol}</p>
              </div>
              <div className="@flex @justify-between @flex-row">
                <p className="@pr-4">Headquaters:</p>
                <p>{agent?.headquarters}</p>
              </div>
              <div className="@flex @justify-between @flex-row">
                <p className="@pr-4">Credits:</p>
                <p>{agent?.credits}</p>
              </div>
            </div>
          </div>
        </ContentPane>
      </div>
    );
  }
  
  export default AgentPage
  