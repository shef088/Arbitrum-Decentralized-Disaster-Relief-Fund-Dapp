import React, { useEffect, useState } from 'react';
import { fetchProposalsByTitle } from '../../utils/fetchProposalsPaginated';
import Pagination from '../../components/Pagination';
import type { ProposalResponse } from '../../types/proposals/types';
import Link from 'next/link';
import Loader from '../../components/Loader';
import { useAccount } from 'wagmi';
import { toast } from 'react-toastify';
import sanitizeHtml from 'sanitize-html';

const SearchProposals: React.FC = () => {
  const [proposals, setProposals] = useState<ProposalResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { isConnected } = useAccount();
  const [start, setStart] = useState(0); // Start index for pagination
  const count = 5; // Number of items per page
  const [totalItems, setTotalItems] = useState(0); // Total items for pagination
  const [currentPage, setCurrentPage] = useState(0); // Track current page
  const [title, setTitle] = useState(''); // Title for searching proposals

  // Fetch proposals based on `start`, `count`, and `title`
  const fetchProposals = async () => {
    if (!isConnected) {
      toast.error("Connect your wallet to continue");
      setLoading(false);
      return;
    }
    if (title.trim() === '') {
      toast.error("Please enter a title to search.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { proposals: fetchedProposals, totalProposals } = await fetchProposalsByTitle(title.trim().toLowerCase(), start, count);
      setProposals(fetchedProposals);
      setTotalItems(totalProposals);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch proposals by title:", err);
      setError("Failed to fetch proposals.");
    } finally {
      setLoading(false);
    }
  };

  // Trigger fetchProposals on initial load and whenever `start` or `title` changes
  useEffect(() => {
    if (title.trim()) {
      fetchProposals();
    }
  }, [start, title, isConnected]);

  // Handle page change
  const handlePageChange = (selectedPage: number) => {
    setStart(selectedPage * count);
    setCurrentPage(selectedPage); // Update the current page
  };
  if(!isConnected && !loading) return <div className="proposals-container"><div className="error-message">Connect wallet to continue!</div></div>
 
  return (
    <div className="proposals-container">
      <h2>Search Proposals</h2>
      {/* {loading &&  <Loader />} */}
      {error && <div className="error-message">{error}</div>}
      {/* Title input for searching proposals */}
      <div className="search-bar">
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="Enter proposal title" 
        />
        <button onClick={fetchProposals}>Search</button>
      </div>

      {proposals.length === 0  && !loading ? (
        <p>No proposals found for the title "{title}".</p>
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
                <span>Voting Deadline: {new Date(Number(proposal.votingDeadline) * 1000).toLocaleString()}</span>
                <span>
                    Status: {proposal.archived
                      ? "Archived"
                      : proposal.executed
                      ? proposal.votingPassed
                        ? "Approved for Donations"
                        : "Rejected"
                      : "Voting"}
                  </span>
              </div>
            </Link>
          </div>
        ))
      )}

      {/* Pagination controls */}
      <Pagination 
        count={count} 
        totalItems={totalItems} 
        onPageChange={handlePageChange} 
        currentPage={currentPage}  // Pass currentPage to Pagination
      />
    </div>
  );
};

export default SearchProposals;
