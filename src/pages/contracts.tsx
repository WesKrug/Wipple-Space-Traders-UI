import ContentPane from "@/components/organisms/ContentPane";
import ContractCard from "@/components/organisms/ContractCard";
import { useSpaceTrader } from "@/context/SpaceTraderContext";
import { getContractAsync, getContractsAsync } from "@/utils/spaceTradersApi";
import { useState } from "react";
import { Contract } from "spacetraders-sdk";

const ContractsPage = () => {
  const {agent} = useSpaceTrader()
  const [contracts, setContracts] = useState<Contract[]>()
  const [contractsSymbol, setContractsSymbol] = useState<string>('')

  const handleGetContracts = async () => {
    const contractsResponse = await getContractsAsync()
    setContracts(contractsResponse)
  }

  const handleGetContract = async () => {
    const contractResponse = await getContractAsync(contractsSymbol)
    setContracts([contractResponse])
  }

  const handleInputUpdated = (e: any) => {
    setContractsSymbol(e.target.value)
  }

  return (
    <div className="@flex @flex-col @items-center">
      <ContentPane title="Contract Input">
        <div className="@w-96 @flex @flex-col">
          <div className="@mb-3 @pt-0">
            <input value={contractsSymbol} onChange={handleInputUpdated} type="text" placeholder="" className="@px-2 @py-1 @text-blue-500 @relative @bg-white @rounded @text-sm @shadow @outline-none focus:@outline-none focus:@shadow-outline @w-full"/>
          </div>
          <button className=" @self-center @mt-4 @w-48 @bg-blue-600 @rounded-lg @text-center hover:@bg-blue-900" onClick={handleGetContract}>
            <p>Get Contract</p>
          </button>
        </div>
      </ContentPane>
      <button className="@mt-4 @w-48 @bg-blue-500 @rounded-lg @text-center hover:@bg-blue-900" onClick={handleGetContracts} >
        <p>Get All Contracts</p>
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
    </div>
  );
}

export default ContractsPage
  