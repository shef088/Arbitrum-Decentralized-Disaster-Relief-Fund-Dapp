import React, { useEffect, useState } from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';  
import type { ProposalResponse } from "../../types/proposals/types";

interface VoteButtonsProps {
    proposal: ProposalResponse;
    handleVote: (vote: boolean) => void;
}

const VoteButtons: React.FC<VoteButtonsProps> = ({ proposal, handleVote }) => {
    const [votesFor, setVotesFor] = useState<number>(0);
    const [votesAgainst, setVotesAgainst] = useState<number>(0);
    useEffect(() => {
        setVotesFor(Number(proposal.votesFor!))
        setVotesAgainst(Number(proposal.votesAgainst!))
        
      }, [proposal]);
    
    return (
        <div className="vote-buttons">
            {!proposal.executed && (
                <>
                    <button onClick={() => handleVote(true)} className="up-vote-btn">
                        <FaArrowUp className="vote-icon" /> <span>
                          {Number(votesFor)}  </span>
                    </button>
                    <button onClick={() => handleVote(false)} className="down-vote-btn">
                        <FaArrowDown className="vote-icon" /> <span>{Number(votesAgainst)}</span>
                    </button>
                </>
            )}
        </div>
    );
};

export default VoteButtons;
