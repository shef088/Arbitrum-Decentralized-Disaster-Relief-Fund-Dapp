import React from 'react';
import { ProposalDetails } from '../../types/proposals/types';

interface VotingDeadlineProps {
  proposal: ProposalDetails;
  countdown: number;
}

const VotingDeadline: React.FC<VotingDeadlineProps> = ({ proposal, countdown }) => {
  return (
    <>
      {!proposal.archived && !proposal.executed && (
        <>
          <p>
            Voting Deadline: <b>{new Date(Number(proposal.votingDeadline) * 1000).toLocaleString()}</b>
          </p>
          <p>
            Voting Deadline Countdown:
            <span className='countdown'>
              {countdown > 0 
                ? `${Math.floor(countdown / 3600)}h ${Math.floor((countdown % 3600) / 60)}m ${countdown % 60}s` 
                : "Expired"}
            </span>
          </p>
          <hr />
          <ul>
            <li>Note: This proposal will only be eligible to receive donations or funding if the votes for are equal to or greater than the votes against.</li>
          </ul>
        </>
      )}
    </>
  );
};

export default VotingDeadline;
