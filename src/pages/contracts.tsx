import ContentPane from "@/components/organisms/ContentPane";
import ContractCard from "@/components/organisms/ContractCard";
import { useSpaceTrader } from "@/context/SpaceTraderContext";
import { acceptContractAsync, getContractsAsync } from "@/utils/spaceTradersApi";
import { useState } from "react";
import { Contract } from "spacetraders-sdk";

const ContractsPage = () => {
  const {agent} = useSpaceTrader()
  const [contracts, setContracts] = useState<Contract[]>()

  const handleGetContracts = async () => {
    const contractsResponse = await getContractsAsync()
    setContracts(contractsResponse)
  }

  return (
    <div className="@flex @flex-col @items-center">
      <button className="@mt-4 @w-48 @bg-blue-500 @rounded-lg @text-center hover:@bg-blue-900" onClick={handleGetContracts} >
        <p>Get Contracts</p>
      </button>
      <div className="@flex @flex-wrap @items-center @justify-center">
      {
        contracts && contracts.map((contract,index) => {
          return (
          <ContractCard key={index} contract={contract}/>
          )
        })
      }
      </div>
      

      {/* { contracts && 
        <ContentPane>
          <pre>{JSON.stringify(contracts,null,2)}</pre>
        </ContentPane>
      } */}

    </div>
  );
}

export default ContractsPage
  