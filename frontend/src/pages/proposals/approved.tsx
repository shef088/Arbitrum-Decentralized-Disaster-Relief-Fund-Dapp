// pages/proposals/approved.tsx
import React, { useEffect, useState } from 'react';
import { fetchExecutedProposals } from '../../utils/fetchProposalsPaginated';
import Pagination from '../../components/Pagination';
import type { ProposalResponse } from "../../types/proposals/types";
import Link from 'next/link';
import { useAccount } from "wagmi";
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';
import sanitizeHtml from 'sanitize-html';

const ApprovedProposals: React.FC = () => {
  const [proposals, setProposals] = useState<ProposalResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isConnected, address } = useAccount();

  const [start, setStart] = useState(0); // Start index for pagination
  const count = 4; // Number of items per page
  const [totalItems, setTotalItems] = useState(0); // Total items for pagination
  const [currentPage, setCurrentPage] = useState(0); // Track current page

  const fetchProposals = async () => {
    if (!isConnected || !address) {
      toast.error("Connect your wallet to continue");
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const { proposals: fetchedProposals, totalProposals } = await fetchExecutedProposals(start, count);
      const approvedProposals = fetchedProposals.filter(p => p.executed && p.votesFor >= p.votesAgainst);
      setProposals(approvedProposals);
      setTotalItems(totalProposals);
      setError(null);
    } catch (err) {
      console.error("Error fetching approved proposals:", err);
      setError("Error fetching approved proposals.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProposals();
  }, [start, isConnected, address]);

  const handlePageChange = (selectedPage: number) => {
    setStart(selectedPage * count);
    setCurrentPage(selectedPage);
  };
  if(!isConnected && !loading) return <div className="proposals-container"><div className="error-message">Connect wallet to continue!</div></div>
 
  return (
    <div className="proposals-container">
      <h2>Approved Proposals for Donations/Funding</h2>
      {loading &&  <Loader />}
      {error && <div className="error-message">{error}</div>}
      {proposals.length === 0  && !loading ? (
        <p>No approved proposals found.</p>
      ) : (
        proposals.map((proposal) => (
          <div className="inner-proposal" key={proposal.id}>
            <Link href={`/proposals/${proposal.id}`}>
            <h3 className="proposal-title">{proposal.title.substring(0, 100)}</h3>
              <p className="proposal-description"> {
               sanitizeHtml(proposal.description.substring(0, 100), { allowedTags: [] })
                }...</p>
              <div className="proposal-details">
                <span>Donate</span>
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

export default ApprovedProposals;
