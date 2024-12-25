import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import fetchProposalById from '../../utils/fetchProposalById';
import { readContract, writeContract } from "@wagmi/core";
import config from "../../wagmi";
import { ABI, deployedAddress } from "../../contracts/deployed-contract";
import type { ProposalResponse } from '../../types/proposals/types';
import { toast } from 'react-toastify';
import { useAccount } from 'wagmi';
import { ethers } from 'ethers';
import { ContractFunctionExecutionError } from 'viem';
import WidthdrawProposalFunds from '../../components/proposal/WidthdrawProposalFunds';
import CheckExecuteProposal from '../../components/proposal/CheckExecuteProposal';
import ArchiveProposal from '../../components/proposal/ArchiveProposal';
import RecreateProposal from '../../components/proposal/RecreateProposal';
import Donate from '../../components/proposal/Donate';
import VoteButtons from '../../components/proposal/VoteButtons';
import ProposalStats from '../../components/proposal/ProposalStats';
import VotingDeadline from '../../components/proposal/VotingDeadline';
import Loader from '../../components/Loader';
import ShareProposal from '../../components/proposal/ShareProposal';
import parse from 'react-html-parser';

const ProposalDetail: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [proposal, setProposal] = useState<ProposalResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [voteError, setVoteError] = useState<string | null>(null);

  const [donationAmountETH, setDonationAmountETH] = useState<string>("");
  const [donationAmountUSD, setDonationAmountUSD] = useState<string>("");
  const [ethToUsdRate, setEthToUsdRate] = useState<number | null>(null);
  const { isConnected, address } = useAccount();
  const [countdown, setCountdown] = useState<number>(0); // Countdown state

  useEffect(() => {
    // Fetch ETH to USD exchange rate
    const fetchEthToUsdRate = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
        const data = await response.json();
        setEthToUsdRate(data.ethereum.usd);
      } catch (error) {
        console.error('Error fetching ETH to USD rate:', error);
      }
    };

    fetchEthToUsdRate();
  }, []);

  useEffect(() => {

    getProposalDetails();
  }, [id, isConnected, address]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => (prevCountdown > 0 ? prevCountdown - 1 : 0));
    }, 1000);

    return () => clearInterval(timer); // Cleanup timer on component unmount
  }, []);
  const getProposalDetails = async () => {
    if (!id) return;
    setLoading(true);
  
    try {
      const proposalId = Number(id);
      const foundProposal = await fetchProposalById(proposalId);
      if (foundProposal) {
        console.log("foundProposal::", foundProposal);
        setProposal(foundProposal);
        
        // Convert BigInt to number safely
        const currentTime = Math.floor(Date.now() / 1000);
        const propDeadline = Number(foundProposal.votingDeadline); // Convert to number

        // Calculate remaining time
        const remainingTime = propDeadline - currentTime;
        setCountdown(remainingTime > 0 ? remainingTime : 0); // Set countdown in seconds
         
      } else {
        setError('Proposal not found');
       
      }
    } catch (err) {

      if (err instanceof ContractFunctionExecutionError) {

        const reason = err.message.includes("Proposal does not exist")
          ? `Proposal with id '${Number(id)}' does not exist.`
          : "Error fetching proposal.";

        toast.error(reason);
        setError(reason);
      } else {
        setError((err as Error).message);
      }

    } finally {
      setLoading(false);
 
    }
  };

  const handleVote = async (voteFor: boolean) => {
    if (!isConnected || !address) {
      toast.error("Connect your wallet to continue");
      setLoading(false);   
      return; 
  }
    if (!proposal) return;
    setVoteError(null);
    if (Date.now() >= Number(proposal.votingDeadline) * 1000) {
      setVoteError('Voting period has ended for this proposal.');
      return;
    }

    try {
      const proposalId: bigint = BigInt(Number(id));
      await writeContract(config, {
        address: deployedAddress,
        abi: ABI,
        functionName: 'vote',
        args: [proposalId, voteFor],
      });

      toast.success(`Successfully voted ${voteFor ? 'for' : 'against'} proposal ${proposal.title}`);
      // Refresh proposal data  
      // const foundProposal = await getProposalDetails()
      window.location.reload()
       
    } catch (err) {
      console.error("Error voting:", err);
      setVoteError("Error casting your vote");
      if (err instanceof ContractFunctionExecutionError) {
        const reason = err.message.includes("Already voted")
          ? "You have already voted with this choice for this proposal."
          : "Error casting your vote.";
        setVoteError(reason);
        toast.error(reason);
      }
    }
  };

  const handleDonate = async () => {
    if (!isConnected || !address) {
      toast.error("Connect your wallet to continue");
      setLoading(false);   
      return; 
  }
    if (!proposal || !donationAmountETH || parseFloat(donationAmountETH) < 0.00001) {
      toast.error("Donation must be greater than 0.00001 ETH");
      return;
    }

    try {
      const ethAmount = ethers.parseEther(donationAmountETH); // Ensure it's correctly formatted for ETH
      const proposalId: bigint = BigInt(Number(id));
      await writeContract(config, {
        address: deployedAddress,
        abi: ABI,
        functionName: 'donateToProposal',
        args: [proposalId],
        value: ethAmount,
      });

      toast.success(`Successfully donated ${donationAmountETH} ETH to proposal ${proposal.title}`);
      setDonationAmountETH("");
      setDonationAmountUSD("");
      window.location.reload()
      

    } catch (err) {
      console.error("Error donating:", err);
      toast.error("Error processing donation");
    }
  };

  const handleEthChange = (ethAmount: string) => {
    const amount = parseFloat(ethAmount);
    if (isNaN(amount) || amount < 0) {
      toast.error("Invalid donation amount");
      return;
    }
    setDonationAmountETH(ethAmount);

    if (ethToUsdRate) {
      setDonationAmountUSD((amount * ethToUsdRate).toFixed(2));
    }
  };

  const handleUsdChange = (usdAmount: string) => {
    setDonationAmountUSD(usdAmount);
    if (ethToUsdRate) {
      setDonationAmountETH((parseFloat(usdAmount) / ethToUsdRate).toFixed(6));
    }
  };

  const handleCheckExpiredAndExecute = async () => {
    if (!isConnected || !address) {
      toast.error("Connect your wallet to continue");
      setLoading(false);   
      return; 
  }
    if (!proposal) return;

    try {
      const proposalId: bigint = BigInt(Number(id));
      await writeContract(config, {
        address: deployedAddress,
        abi: ABI,
        functionName: 'executeProposal',
        args: [proposalId],
      });

      toast.success(`Executed proposal ${proposal.title} successfully!.`);
     
      window.location.reload()
    } catch (err) {
      console.error("Error executing proposal:", err);
      console.error("Error executing msg:", err);
      if (err instanceof ContractFunctionExecutionError) {
        const reason = err.message.includes("Voting period not ended")
          ? "Voting period not ended. Wait till it ends to Execute!."
          : "Error Executing";

        toast.error(reason);
      }
    }

  };

  const handleArchive = async () => {
    if (!isConnected || !address) {
      toast.error("Connect your wallet to continue");
      setLoading(false);   
      return; 
  }
    if (!proposal) return;
    const confirmation = window.confirm("Are you sure you want to archive this proposal?");
    if (!confirmation) return;
    try {
      const proposalId: bigint = BigInt(Number(id));

      await writeContract(config, {
        address: deployedAddress,
        abi: ABI,
        functionName: 'archiveProposal', // Function to archive the proposal
        args: [proposalId],
      });

      toast.success(`Successfully archived proposal ${proposal.title}`);
      window.location.reload()
    } catch (err) {
      console.error("Error archiving proposal:", err);
      if (err instanceof ContractFunctionExecutionError) {
        const reason = err.message.includes("Cannot archive this proposal")
          ? "This proposal cannot be archived."
          : "Error archiving proposal.";
        toast.error(reason);
      }
    }
  };

  const recreateProposal = async () => {
    if (!isConnected || !address) {
      toast.error("Connect your wallet to continue");
      setLoading(false);   
      return; 
  }
    if (!proposal) return;

    try {
      const proposalId: bigint = BigInt(Number(id));

      await writeContract(config, {
        address: deployedAddress,
        abi: ABI,
        functionName: 'recreateProposal',
        args: [proposalId],
      });

      toast.success(`Successfully recreated proposal ${proposal.title}`);

      router.push('/proposals/userproposals')
    } catch (err) {
      console.error("Error recreating proposal:", err);

    }
  }
  const allocateFundsToProposer = async () => {
    if (!isConnected || !address) {
      toast.error("Connect your wallet to continue");
      setLoading(false);   
      return; 
  }
    if (!proposal) return;
    try {
      const proposalId: bigint = BigInt(Number(id));
      await writeContract(config, {
        address: deployedAddress,
        abi: ABI,
        functionName: 'allocateFundsToProposer',
        args: [proposalId],
      });
      toast.success(`Funds allocated to proposer for proposal ${proposal.title}`);
      window.location.reload()
    } catch (err) {
      console.error("Error allocating funds to proposer:", err);
      if (err instanceof ContractFunctionExecutionError) {
        const reason = err.message.includes("Only executable proposals")
          ? "Only executable proposals can have funds allocated."
          : "Error allocating funds.";
        toast.error(reason);
      }
    }
  };
  if (loading) return <div className="proposal-detail-container"> <Loader /></div>
  if(!isConnected && !loading) return <div className="proposals-container"><div className="error-message">Connect wallet to continue!</div></div>
  if (!proposal ) return  <div className="proposal-detail-container"><p>No proposal data available.</p></div>;
  return (
    <div className="proposal-detail-container">
       
      {error && <div className="error-message">{error}</div>}

      <h2>Proposal Details</h2>
      <div className="proposal-detail">
        <h2>{proposal.title}</h2>
        <p>Description: </p>
        <p className='descr'>{parse(proposal.description)}</p>
        <p>Date Created: {new Date(Number(proposal.dateCreated) * 1000).toLocaleString()}</p>
        <hr />
        <VotingDeadline proposal={proposal} countdown={countdown} />

        <ProposalStats proposal={proposal} ethToUsdRate={ethToUsdRate} />

        <VoteButtons proposal={proposal} handleVote={handleVote}  />  

        {voteError && <p className="error">{voteError}</p>}
        {!proposal.archived &&    <ShareProposal proposalId={id as string} />}
     
        <WidthdrawProposalFunds proposal={proposal}
          ethToUsdRate={ethToUsdRate}
          allocateFundsToProposer={allocateFundsToProposer} />

        <Donate
          proposal={proposal} 
          donationAmountETH={donationAmountETH}
          donationAmountUSD={donationAmountUSD}
          handleEthChange={handleEthChange}
          handleUsdChange={handleUsdChange}
          handleDonate={handleDonate}
        />


       
        <CheckExecuteProposal
          proposal={proposal}
          handleCheckExpiredAndExecute={handleCheckExpiredAndExecute}
          countdown={countdown} 
        />

        <ArchiveProposal
          proposal={proposal}
          address={address}
          handleArchive={handleArchive}
        />

        <RecreateProposal proposal={proposal} recreateProposal={recreateProposal} />


      </div>
    </div>
  );
};

export default ProposalDetail;
