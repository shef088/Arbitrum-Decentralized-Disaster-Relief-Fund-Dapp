import fetchProposals from './fetchProposals'; // Import the existing function
import type { ProposalResponse } from '../types/proposals/types';

const fetchApprovedProposals = async (): Promise<ProposalResponse[]> => {
  try {
    const allProposals = await fetchProposals(); // Get all proposals

    // Filter out the approved proposals (executed and passed)
    const approvedProposals = allProposals.filter(proposal => 
      proposal.executed && proposal.votingPassed // Check if executed and passed
    );

    return approvedProposals;
  } catch (error ) {
    throw new Error(`Failed to fetch approved proposals: ${error}`);
  }
};

export default fetchApprovedProposals;
