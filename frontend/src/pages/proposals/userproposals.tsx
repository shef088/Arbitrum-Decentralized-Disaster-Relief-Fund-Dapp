import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import fetchUserProposals from '../../utils/fetchUserProposals';
import Pagination from '../../components/Pagination';
import Loader from '../../components/Loader';
import { ProposalResponse } from '../../types/proposals/types';
import { useAccount } from 'wagmi';
import { toast } from 'react-toastify';
import Link from 'next/link';
import sanitizeHtml from 'sanitize-html';

const UserProposals: React.FC = () => {
  const { isConnected, address } = useAccount();
  const router = useRouter();
  const [proposals, setProposals] = useState<ProposalResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [start, setStart] = useState<number>(0); // Start index for pagination
  const count = 4; // Number of items per page
  const [totalItems, setTotalItems] = useState<number>(0); // Total items for pagination
  const [currentPage, setCurrentPage] = useState<number>(0); // Track current page
  const [countFetchSuccessful, setCountFetchSuccessful] = useState<boolean>(false); // Track if count fetch succeeded

  // Fetch the total number of proposals
  const fetchTotalProposalCount = async () => {
    if (!isConnected || !address) {
      toast.error("Connect your wallet to continue");
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const totalProposalCount = await fetchUserProposals(address, 0, 0); // Fetch only the count
      setTotalItems(totalProposalCount.totalProposalCount);
      setCountFetchSuccessful(true); // Mark count fetch as successful
    } catch (err) {
      console.error("Failed to fetch total proposal count:", err);
      setError("Failed to fetch total proposal count.");
      setCountFetchSuccessful(false); // Prevent further actions
    } finally {
      setLoading(false);
    }
  };

  // Fetch proposals based on current start and count
  const fetchProposals = async () => {
    if (!isConnected || !address) {
      toast.error("Connect your wallet to continue");
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const { proposals: fetchedProposals } = await fetchUserProposals(address, start, count);
      setProposals(fetchedProposals.reverse()); // Show newest proposals first
      setError(null);
    } catch (err) {
      console.error("Failed to fetch proposals:", err);
      setError("Failed to fetch user proposals.");
    } finally {
      setLoading(false);
    }
  };

  // Calculate start index for the current page
  useEffect(() => {
    if (totalItems > 0) {
      const calculatedStart = totalItems - (currentPage + 1) * count;
      setStart(calculatedStart < 0 ? 0 : calculatedStart); // Ensure start index is non-negative
    }
  }, [currentPage, totalItems]);

  // Re-fetch proposals when the URL changes and the count fetch was successful
  useEffect(() => {
    if (countFetchSuccessful) {
      fetchProposals();
    }
  }, [router.asPath, countFetchSuccessful, start]);

  // Fetch the total proposal count when the component mounts
  useEffect(() => {
    fetchTotalProposalCount();
  }, [isConnected, address]);

  // Handle page changes
  const handlePageChange = (selectedPage: number) => {
    setCurrentPage(selectedPage); // Update current page
    
  };
  if(!isConnected && !loading) return <div className="proposals-container"><div className="error-message">Connect wallet to continue!</div></div>
  return (
    <div className="proposals-container">
      <h1>Your Proposals</h1>
      {loading && <Loader />}
      {error && <div className="error-message">{error}</div>}
      {proposals.length === 0 && !loading && !error ? (
        <p>No proposals found for this user.</p>
      ) : (
        <ul>
          {proposals.map((proposal) => (
            <div className="inner-proposal" key={proposal.id}>
              <Link href={`/proposals/${proposal.id}`}>
                <h3 className="proposal-title">{proposal.title.substring(0, 100)}</h3>
                <p className="proposal-description"> {
               sanitizeHtml(proposal.description.substring(0, 100), { allowedTags: [] })
                }...</p>                <div className="proposal-details">
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
          ))}
        </ul>
      )}
      <Pagination
        count={count}
        totalItems={totalItems}
        onPageChange={handlePageChange}
        currentPage={currentPage} // Pass currentPage to Pagination
      />
    </div>
  );
};

export default UserProposals;
