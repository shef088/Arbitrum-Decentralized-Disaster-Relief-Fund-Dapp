// utils/fetchProposalById.ts
import { readContract } from '@wagmi/core';
import config from "../wagmi";
import { ABI, deployedAddress } from "../contracts/deployed-contract";
import type { ProposalDetails, ProposalResponse } from "../types/proposals/types";

const fetchProposalById = async (id: number): Promise<ProposalResponse | null> => {
  
    // Fetch the specific proposal by its ID from the smart contract
    const proposal: ProposalDetails = await readContract(config, {
      address: deployedAddress,
      abi: ABI,
      functionName: 'getProposal',
      args: [BigInt(id)], // Convert ID to BigInt
    }) as ProposalDetails;
console.log("proposalData::", proposal)
    // Return the proposal with an ID field
    return { ...proposal  }; // Add the ID to the returned object
 
};

export default fetchProposalById;
