import { readContract } from '@wagmi/core';
import config from "../wagmi";
import { ABI, deployedAddress } from "../contracts/deployed-contract";
import type { ProposalDetails, ProposalResponse } from "../types/proposals/types";

interface UserProposalsResponse {
  proposals: ProposalResponse[];
  totalProposalCount: number;
}

const fetchUserProposals = async (userAddress: string, start: number, count: number): Promise<UserProposalsResponse> => {
  const userProposals: ProposalResponse[] = [];

  try {
    // Fetch the proposal IDs and total count created by the user
    const [proposalIds, totalProposalCount] = await readContract(config, {
      address: deployedAddress,
      abi: ABI,
      functionName: 'getUserProposals',
      args: [userAddress as `0x${string}`, BigInt(start), BigInt(count)], // Pass all three arguments
    }) as [bigint[], bigint]; // Update to handle tuple response

    console.log("props:::", proposalIds, totalProposalCount)
    // Fetch details for each proposal using the proposal IDs
    for (const id of proposalIds) {
      const proposal: ProposalDetails = await readContract(config, {
        address: deployedAddress,
        abi: ABI,
        functionName: 'getProposal',
        args: [id],
      }) as ProposalDetails;

      userProposals.push({ ...proposal }); 
    }

    return {
      proposals: userProposals,
      totalProposalCount: Number(totalProposalCount),  
    };
  } catch (error) {
    console.error("Error fetching user proposals:", error);
    throw new Error("Failed to fetch user proposals");
  }
};

export default fetchUserProposals;
