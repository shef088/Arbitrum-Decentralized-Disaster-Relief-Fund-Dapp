// pages/proposals/rejected.tsx
import React, { useEffect, useState } from 'react';
import { fetchExecutedProposals } from '../../utils/fetchProposalsPaginated';
import Pagination from '../../components/Pagination';
import type { ProposalResponse } from "../../types/proposals/types";
import Link from 'next/link';
import { useAccount } from "wagmi";
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';
import sanitizeHtml from 'sanitize-html';

const RejectedProposals: React.FC = () => {
  const [proposals, setProposals] = useState<ProposalResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isConnected } = useAccount();

  const [start, setStart] = useState(0); // Start index for pagination
  const count = 4; // Number of items per page
  const [totalItems, setTotalItems] = useState(0); // Total items for pagination
  const [currentPage, setCurrentPage] = useState(0); // Track current page

  const fetchProposals = async () => {
    if (!isConnected) {
      toast.error("Connect your wallet to continue");
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const { proposals: fetchedProposals, totalProposals } = await fetchExecutedProposals(start, count);
      const rejectedProposals = fetchedProposals.filter(p => !p.votingPassed );
      setProposals(rejectedProposals);
      setTotalItems(totalProposals);
      setError(null);
    } catch (err) {
      console.error("Error fetching rejected proposals:", err);
      setError("Error fetching rejected proposals.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProposals();
  }, [start, isConnected]);

  const handlePageChange = (selectedPage: number) => {
    setStart(selectedPage * count);
    setCurrentPage(selectedPage);
  };

  if(!isConnected && !loading) return <div className="proposals-container"><div className="error-message">Connect wallet to continue!</div></div>
  return (
    <div className="proposals-container">
      <h2>Rejected Proposals</h2>
      {loading &&  <Loader />}
      {error && <div className="error-message">{error}</div>}
      {proposals.length === 0  && !loading ? (
        <p>No rejected proposals found.</p>
      ) : (
        proposals.map((proposal) => (
          <div className="inner-proposal" key={proposal.id}>
            <Link href={`/proposals/${proposal.id}`}>
              <h3 className="proposal-title">{proposal.title.substring(0, 100)}</h3>
              <p className="proposal-description"> {
               sanitizeHtml(proposal.description.substring(0, 100), { allowedTags: [] })
                }...</p>              <div className="proposal-details">
                <span>Votes For: {Number(proposal.votesFor)}</span>
                <span>Votes Against: {Number(proposal.votesAgainst)}</span>
                <span>Deadline: {new Date(Number(proposal.votingDeadline) * 1000).toLocaleString()}</span>
                <span>Status: {proposal.votingPassed ? "Approved" : "Rejected"}</span>
              </div>
            </Link>
          </div>
        ))
      )}
      <Pagination 
        count={count} 
        totalItems={totalItems} 
        onPageChange={handlePageChange} 
        currentPage={currentPage}
      />
    </div>
  );
};

export default RejectedProposals;
