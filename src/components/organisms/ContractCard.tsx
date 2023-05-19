import ContentPane from "@/components/organisms/ContentPane";
import { AcceptContract200ResponseData, Contract } from 'spacetraders-sdk'
import { acceptContractAsync } from "@/utils/spaceTradersApi";
import { useState } from "react";


interface Props {
    contract: Contract;
  }
const ContractCard = ({contract}: Props) => {
    const [acceptedResponse, setAcceptedResponse] = useState<AcceptContract200ResponseData>()
    const expirationDate = new Date(contract.expiration)
    
    const formatExpiration = (expiration: Date): string => {
        return expiration.toDateString() + ' @ ' + expiration.getHours() + ':' +expiration.getMinutes()
    }

    const handleAcceptContract = async () => {
        const acceptContractResp = await acceptContractAsync(contract.id)
        setAcceptedResponse(acceptContractResp)
    }
  return (
    <div>
      <div className="@flex-col">
        <ContentPane title="Contract Information">
            <div className="@flex @flex-col @w-[25vw]">
            <div className="@flex @justify-between @my-2">
                    <div className="@font-bold">
                        Id:  
                    </div>
                    <div className=" @text-right ">
                      {contract.id}
                    </div>
                </div>
                <div className="@flex @justify-between @my-2">
                    <div className="@font-bold">
                        Faction:  
                    </div>
                    <div className=" @text-right ">
                      {contract.factionSymbol}
                    </div>
                </div>
                <div className="@flex @justify-between @my-2">
                    <div className="@font-bold">
                        Type:  
                    </div>
                    <div>
                      {contract.type}
                    </div>
                </div>
                <div className="@flex @justify-between @my-2">
                    <div className="@font-bold">
                        Accepted:  
                    </div>
                    <div>
                      {contract.accepted ? '✅' : '❌'}
                    </div>
                </div>
                <div className="@flex @justify-between @my-2">
                    <div className="@font-bold">
                        Fulfilled:  
                    </div>
                    <div>
                      {contract.fulfilled ? '✅' : '❌'}
                    </div>
                </div>
                <div className="@flex @justify-between @my-2">
                    <div className="@font-bold">
                        Expiration:  
                    </div>
                    <div>
                      {formatExpiration(new Date(contract.expiration))}
                    </div>
                </div>

                <div className="@flex @flex-row @justify-center">
                    {/* Terms */}
                    <div className="@flex @flex-col @mx-8 @bg-blue-600 @border-white @rounded-lg @p-2">
                        <p className="@font-bold @underline">Terms</p>
                        <div>
                            <div className="@font-bold">
                                Deadline:  
                            </div>
                            <div>
                                {formatExpiration(new Date(contract.terms.deadline))}
                            </div>
                        </div>
                        <div>
                            <div className="@font-bold">
                                Payment:  
                            </div>
                            <div className="@flex @flex-col">
                                <div>
                                    On Accepted: {contract.terms.payment.onAccepted}
                                </div>
                                <div>
                                    On Fulfilled: {contract.terms.payment.onFulfilled}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Delivery */}
                    { contract.terms.deliver &&
                    <div className="@flex @flex-col @mx-8 @bg-blue-600 @border-white @rounded-lg @p-2">
                        <p className="@font-bold @underline">Deliveries</p>
                        {
                            contract.terms.deliver.map((delivery,index) => {
                                return ( 
                                    // <div key={index}>
                                    
                                    // </div>
                                    <section key={index}>
                                        <div>
                                            <div className="@font-bold">
                                                Destination:  
                                            </div>
                                            <div>
                                                {delivery.destinationSymbol}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="@font-bold">
                                                Trade:  
                                            </div>
                                        </div>
                                        <div>
                                            {delivery.unitsFulfilled}/{delivery.unitsRequired} {delivery.tradeSymbol}
                                        </div>                                    
                                    </section>
                                )
                            })
                        }
                    </div>
                    }
                </div>
                {!contract.accepted && 
                <section className="@mt-4 @self-center">
                    <div>
                        <button className="@bg-blue-600" onClick={handleAcceptContract}>Accept Contract?</button>
                    </div>
                </section>}

                { acceptedResponse && 
                    <ContentPane>
                    <pre>{JSON.stringify(acceptedResponse,null,2)}</pre>
                    </ContentPane>
                }
            </div>
        </ContentPane>
      </div>
    </div>
  );
}

export default ContractCard
  

