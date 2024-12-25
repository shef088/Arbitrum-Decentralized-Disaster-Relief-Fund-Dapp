import React from 'react';
import { ProposalDetails } from '../../types/proposals/types';

interface ArchiveProposalProps {
  proposal: ProposalDetails;  
  address: `0x${string}` | undefined;   
  handleArchive: () => void;
}

const ArchiveProposal: React.FC<ArchiveProposalProps> = ({ proposal, address, handleArchive }) => {
  return (
    <>
      {proposal.proposer === address && !proposal.archived && (
        <div className="archive-section">
          <span>Equivalent to set proposal inactive/delete. (Permanently set to inactive)</span>
          <button onClick={handleArchive}>Archive Proposal</button>
        </div>
      )}
    </>
  );
};

export default ArchiveProposal;
