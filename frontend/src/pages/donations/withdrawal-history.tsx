import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { toast } from 'react-toastify';
import Pagination from '../../components/Pagination';  // Pagination component to control page changes
import Loader from '../../components/Loader';
import { ethers } from 'ethers';
import config from '../../wagmi';
import { readContract } from '@wagmi/core';
import { ABI, deployedAddress } from '../../contracts/deployed-contract';
import Link from 'next/link';

interface Withdrawal {
  amount: string;
  usd: string; // USD equivalent
  proposalId: number;
  timestamp: number;
}

interface FundsSummary {
  totalReceived: string;
  totalWithdrawn: string;
  remainingBalance: string;
  totalReceivedUsd: string;
  totalWithdrawnUsd: string;
  remainingBalanceUsd: string;
}

const WithdrawalHistory: React.FC = () => {
  const { isConnected, address } = useAccount();
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
  const [summary, setSummary] = useState<FundsSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [start, setStart] = useState(0); // Start index for pagination
  const count = 5; // Number of items per page
  const [totalItems, setTotalItems] = useState(0); // Total items for pagination
  const [currentPage, setCurrentPage] = useState(0); // Track current page

  // Fetch the ETH-to-USD exchange rate
  const fetchEthToUsdRate = async (): Promise<number> => {
    try {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'
      );
      const data = await response.json();
      return data.ethereum.usd; // Return the USD rate for 1 ETH
    } catch (error) {
      console.error("Error fetching ETH-USD rate:", error);
      return 0; // Return 0 if fetching fails
    }
  };

  const fetchFundsSummary = async (ethToUsdRate: number) => {
    if (!isConnected || !address) {
      toast.error("Connect your wallet to continue");
      return;
    }
  
    try {
      const result = await readContract(config, {
        address: deployedAddress,
        abi: ABI,
        functionName: 'getUserFundsSummary',
        args: [address as `0x${string}`],
      });
  
      // Ensure the contract returns valid values (not null or undefined)
      const totalReceived = result[0] ? parseFloat(ethers.formatEther(result[0])) : 0;
      const totalWithdrawn = result[1] ? parseFloat(ethers.formatEther(result[1])) : 0;
      const remainingBalance = totalReceived - totalWithdrawn;
      setSummary({
        totalReceived: totalReceived.toFixed(4),
        totalWithdrawn: totalWithdrawn.toFixed(4),
        remainingBalance: remainingBalance.toFixed(4),
        totalReceivedUsd: (totalReceived * ethToUsdRate).toFixed(2),
        totalWithdrawnUsd: (totalWithdrawn * ethToUsdRate).toFixed(2),
        remainingBalanceUsd: (remainingBalance * ethToUsdRate).toFixed(2),
      });
    } catch (error) {
      console.error("Error fetching funds summary:", error);
      toast.error("Failed to fetch funds summary.");
    }
  };
  

  // Fetch withdrawals based on `start`, `count`
  const fetchWithdrawals = async (ethToUsdRate: number) => {
    if (!isConnected || !address) {
      toast.error("Connect your wallet to continue");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      // Fetch withdrawals from the smart contract
      const { withdrawals: fetchedWithdrawals, totalWithdrawals } = await fetchUserWithdrawals(address, start, count);

      const formattedWithdrawals = fetchedWithdrawals.map((withdrawal) => {
        const ethAmount = parseFloat(withdrawal.amount); // Ensure amount is parsed as a number
        const usdAmount = ethAmount * ethToUsdRate; // Calculate USD equivalent

        return {
          amount: ethAmount.toFixed(4), // Format ETH amount to 4 decimals
          usd: usdAmount.toFixed(2),    // Format USD amount to 2 decimals
          proposalId: withdrawal.proposalId,
          timestamp: withdrawal.timestamp,
        };
      });

      setWithdrawals(formattedWithdrawals);
      setTotalItems(totalWithdrawals);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch withdrawals:", err);
      setError("Failed to fetch withdrawals.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch user withdrawals from the smart contract
  const fetchUserWithdrawals = async (address: string, start: number, count: number) => {
    try {
      const result = await readContract(config, {
        address: deployedAddress,
        abi: ABI,
        functionName: 'getUserWithdrawals',
        args: [address as `0x${string}`, BigInt(start), BigInt(count)],
      });

      const withdrawals = result[0] as { amount: bigint, proposalId: bigint, timestamp: bigint }[];
      const totalWithdrawals = result[1] as bigint;

      return {
        withdrawals: withdrawals.map(w => ({
          amount: ethers.formatEther(w.amount), // Convert amount from bigint to ETH
          proposalId: Number(w.proposalId),    // Convert proposalId from bigint to number
          timestamp: Number(w.timestamp),     // Convert timestamp from bigint to number
        })),
        totalWithdrawals: Number(totalWithdrawals), // Convert totalWithdrawals from bigint to number
      };
    } catch (error) {
      console.error('Error fetching user withdrawals:', error);
      throw new Error('Failed to fetch withdrawals');
    }
  };

  // Fetch ETH-to-USD rate, funds summary, and withdrawals
  useEffect(() => {
    const fetchData = async () => {
      const ethToUsdRate = await fetchEthToUsdRate();
      await fetchFundsSummary(ethToUsdRate);
      await fetchWithdrawals(ethToUsdRate);
    };

    fetchData();
  }, [start, isConnected]);

  // Handle page change
  const handlePageChange = (selectedPage: number) => {
    setStart(selectedPage * count);
    setCurrentPage(selectedPage); // Update the current page
  };

  
  if(!isConnected && !loading) return <div className="user-donations-container"><div className="error-message">Connect wallet to continue!</div></div>
  return (
    <div className="user-donations-container">
         {loading &&  <Loader />}
         {error && <div className="error-message">{error}</div>}
      <h2>Your Funds Overview</h2>
      {summary && !loading && (
  <div className="funds-overview">
    <table>
      <thead>
        <tr>
          <th>Details</th>
          <th>Amount (ETH)</th>
          <th>Amount (USD)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Total Raised:</td>
          <td>{summary.totalReceived} ETH</td>
          <td>${summary.totalReceivedUsd} USD</td>
        </tr>
        <tr>
          <td>Total Withdrawn(After 3% fees):</td>
          <td>{summary.totalWithdrawn} ETH</td>
          <td>${summary.totalWithdrawnUsd} USD</td>
        </tr>
        <tr>
          <td>Remaining Balance:</td>
          <td>{summary.remainingBalance} ETH</td>
          <td>${summary.remainingBalanceUsd} USD</td>
        </tr>
      </tbody>
    </table>
    <br></br>
    <ul>
      <li>NB: To withdraw funds raised go to the proposal page</li>
    </ul>
  </div>
)}
<br></br>
      <h2>Your Withdrawal History</h2>
      {withdrawals.length === 0  && !loading? (
        <p>No withdrawals found.</p>
      ) : (
        <div className="donation-list">
          {withdrawals.map((withdrawal, index) => (
            <Link className="donation-item" key={index}  href={`/proposals/${withdrawal.proposalId}`}>
              <p>Proposal ID: {withdrawal.proposalId}</p>
              <p>Amount: {withdrawal.amount} ETH (${withdrawal.usd} USD)</p>
              <p>Timestamp: {new Date(withdrawal.timestamp * 1000).toLocaleString()}</p> {/* Convert timestamp to readable date */}
            </Link>
          ))}
        </div>
      )}

      {/* Pagination controls */}
      <Pagination 
        count={count} 
        totalItems={totalItems} 
        onPageChange={handlePageChange} 
        currentPage={currentPage} // Pass currentPage to Pagination
      />
    </div>
  );
};

export default WithdrawalHistory;
