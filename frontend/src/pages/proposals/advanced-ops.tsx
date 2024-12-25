import React, { useState } from 'react';
import { writeContract } from '@wagmi/core';
import config from '../../wagmi';
import { ABI, deployedAddress } from '../../contracts/deployed-contract';
import { toast } from 'react-toastify';
import { useAccount } from 'wagmi';

const AdvancedOps: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { isConnected, address } = useAccount();

  const handleCheckExpiredProposals = async () => {
    if (!isConnected || !address) {
      toast.error("Connect your wallet to continue");
      setLoading(false);   
      return; 
  }

    setLoading(true);
    try {
      await writeContract(config, {
        address: deployedAddress,
        abi: ABI,
        functionName: 'checkExpiredProposals',
      });

      toast.success("Checked for expired proposals!");
    } catch (error) {
      console.error("Error checking expired proposals:", error);
      toast.error("Error checking expired proposals");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="advanced-ops-container">
      <h2>Advanced Operations</h2>
      <span>Expiry checks are automated using chainlink automation. Continue if automation is not set up, or if it is urgent!</span>
      <span>Review all proposals to check for expired voting deadlines and automatically execute them. This process can be triggered by anyone.</span>
     <br/><br/> <button className='adv-button' onClick={handleCheckExpiredProposals} disabled={loading}>
        {loading ? "Checking..." : "Check Expired Proposals"}
      </button>
    </div>
  );
};

export default AdvancedOps;
