import React from 'react';
import { ethers } from 'ethers';
import { ProposalDetails } from '../../types/proposals/types';

interface WithdrawProposalFundsProps {
  proposal: ProposalDetails;
  ethToUsdRate: number | null; // Allow null as well
  allocateFundsToProposer: () => void;
}

const WithdrawProposalFunds: React.FC<WithdrawProposalFundsProps> = ({ proposal, ethToUsdRate, allocateFundsToProposer }) => {
  const usdAmount = ethToUsdRate ? (parseFloat(ethers.formatEther(proposal.fundsReceived)) * ethToUsdRate).toFixed(2) : "0"; // Handle null case
  const ethAmount = proposal.fundsReceived
    ? ethers.formatEther(proposal.fundsReceived)
    : "0";
  const afterCutEth = proposal.fundsReceived > 0
    ? ethers.formatEther(
        BigInt(proposal.fundsReceived) * BigInt(0.97 * 1e18) / BigInt(1e18)
      )
    : "0";
  const afterCutUsd = proposal.fundsReceived > 0 && ethToUsdRate
    ? ((parseFloat(afterCutEth) * ethToUsdRate) * 0.97).toFixed(2)
    : "0";

  return (
    <>
      {proposal.fundsReceived > 0 && (
        <div className="note-section-container">
          <span>Note: Withdrawals have a fee of 3% for the upkeep of the platform</span>

          <div className="funds-info">
            <div className="available-funds">
              <span>Available Funds:</span>
              <span className="received-amount">
                {ethAmount} ETH ({usdAmount} USD $)
              </span>
            </div>

            <div className="available-funds">
              <span>After 3% cut:</span>

              <div className="received-amount">
                <span className="eth-received">
                  {afterCutEth} ETH | USD $
                  {afterCutUsd}
                </span>
              </div>
            </div>
          </div>

          <button className="withdraw-button" onClick={allocateFundsToProposer}>Withdraw funds</button>
        </div>
      )}
    </>
  );
};

export default WithdrawProposalFunds;
