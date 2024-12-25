// utils/fetchProposals.ts
import { readContract } from '@wagmi/core';
import config from "../wagmi";
import { ABI, deployedAddress } from "../contracts/deployed-contract";
import type { ProposalDetails, ProposalResponse } from "../types/proposals/types";

const fetchProposals = async (): Promise<ProposalResponse[]> => {
  const proposals: ProposalResponse[] = [];
  
  try {
    // Fetch the number of proposals
    const proposalCount = await readContract(config, {
      address: deployedAddress,
      abi: ABI,
      functionName: 'proposalCount',
    });

    for (let i = BigInt(1); i <= proposalCount; i++) {
      const proposal: ProposalDetails = await readContract(config, {
        address: deployedAddress,
        abi: ABI,
        functionName: 'getProposal',
        args: [i],
      }) as ProposalDetails;

     
    }

    return proposals;
  } catch (error) {
    console.error("Error fetching proposals:", error);
    throw new Error("Failed to fetch proposals");
  }
};

export default fetchProposals;
