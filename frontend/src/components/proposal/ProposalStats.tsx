import React from 'react';
import { ethers } from 'ethers'; // Ensure ethers is installed and imported

// Define types for the props
interface ProposalStatsProps {
  proposal: {
    archived: boolean;
    executed: boolean;
    votingPassed: boolean;
    fundsReceived: bigint;
    overallFundsReceived: bigint;
  };
  ethToUsdRate: number | null; // Can be a number or null if the rate is not available
}

const ProposalStats: React.FC<ProposalStatsProps> = ({ proposal, ethToUsdRate }) => {
    return (
        <div className="proposal-stats">
            <p>Status:
                {proposal.archived
                    ? <span className='error'>Archived (Cannot receive votes or donations!)</span>
                    : proposal.executed
                        ? (proposal.votingPassed ? <span> Approved for Donations/Funding</span> :<span> Rejected</span>)
                        :<span> Voting</span> }
            </p>

            <p>
                Overall Received Raised: <span className="funds-p"> 
                    {proposal.fundsReceived ? ethers.formatEther(proposal.fundsReceived) : "0"} ETH
                    ({proposal.overallFundsReceived ? (parseFloat(ethers.formatEther(proposal.overallFundsReceived)) * (ethToUsdRate || 0)).toFixed(2) : "0"} USD $)
                </span>
            </p>
            <p>
                Available Funds: <span className="funds-p"> 
                    {proposal.fundsReceived ? ethers.formatEther(proposal.fundsReceived) : "0"} ETH
                    ({proposal.fundsReceived ? (parseFloat(ethers.formatEther(proposal.fundsReceived)) * (ethToUsdRate || 0)).toFixed(2) : "0"} USD $)
                </span>
            </p>
        </div>
    );
};

export default ProposalStats;
