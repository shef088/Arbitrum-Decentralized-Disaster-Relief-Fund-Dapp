import React from 'react';
import { ProposalDetails } from '../../types/proposals/types';

interface RecreateProposalProps {
  proposal: ProposalDetails;
  recreateProposal: () => void;
}

const RecreateProposal: React.FC<RecreateProposalProps> = ({ proposal, recreateProposal }) => {
  return (
    <>
      {proposal.archived && (
        <div className="recreate-section">
          <button onClick={() => recreateProposal()}>Recreate Proposal</button>
        </div>
      )}
    </>
  );
};

export default RecreateProposal;
