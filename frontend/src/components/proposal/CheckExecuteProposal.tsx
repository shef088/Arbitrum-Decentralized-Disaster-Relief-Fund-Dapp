import React from 'react';
import { ProposalDetails } from '../../types/proposals/types';

interface CheckExecuteProposalProps {
  proposal: ProposalDetails;
  handleCheckExpiredAndExecute: () => void;
  countdown: number;
}

const CheckExecuteProposal: React.FC<CheckExecuteProposalProps> = ({ proposal, handleCheckExpiredAndExecute, countdown }) => {
  const isExpired = countdown <= 0;

  return (
    <>
      {!proposal.executed && !proposal.archived && isExpired && (
        <div className="check-exp">
          <span>Proposal expiry checks are automatically checked on the blockchain every 24 hours with Chainlink automation. Only execute if urgent!</span>
          <span>
            Execute if your proposal's voting period has ended but proposal status is still Voting. (Triggers execute if expired)
          </span>
          <button onClick={handleCheckExpiredAndExecute}>Execute Expired</button>
        </div>
      )}
    </>
  );
};

export default CheckExecuteProposal;
