import axios, { AxiosRequestConfig } from "axios";
import useAxios from "axios-hooks";
import Head from "next/head";
import { useState } from "react";

interface AgentData {
  accountId: string;
  symbol: string;
  headquarters: string;
  credits: number;  

}
interface AgentResponse {
  data: AgentData
}

export function Home() {
  const [agentData, setAgentData] = useState("")

  const config: AxiosRequestConfig = {
    baseURL: "https://api.spacetraders.io/v2/",
    url: "my/agent",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SPACE_TOKEN}`
    },
  }
  const [{ data, loading, error }, refetch] = useAxios<AgentResponse>(config);


  return (
    <section>
      <Head>
        <title>Wipple's Space Traders UI</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="@rounded-lg  @bg-blue-500 @center @max-w-[75vw] @p-3 inProgress">
        <h1>Welcome to Wipple's Space Traders!</h1>
        <button className="@rounded-lg @m-2 @bg-blue-950" onClick={() => {refetch()}}>
          <h2 className="@m-1">Get Agent</h2>
        </button>
        <div className="@rounded-sm @bg-blue-900">
          {loading && <p>Loading...</p>}
          {!!error && <p>{error.message}</p>}
          {!!data && <pre>{JSON.stringify(data, null, 2)}</pre>}
        </div>
      </div>
    </section>
  );
}
