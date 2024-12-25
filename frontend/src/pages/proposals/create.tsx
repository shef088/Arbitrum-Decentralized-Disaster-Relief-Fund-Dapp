import React, { useState } from 'react';
import { writeContract } from "@wagmi/core";
import config from "../../wagmi";
import { ABI, deployedAddress } from "../../contracts/deployed-contract";
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useAccount } from 'wagmi';
import dynamic from 'next/dynamic';
// import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css'; // Import Quill styles
const QuillNoSSRWrapper = dynamic(() => import('react-quill'), {
  ssr: false, // Disable server-side rendering for this component
  loading: () => <p>Loading editor...</p>, // Optional: Show a fallback while loading
});
const CreateProposal: React.FC = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState(''); // Quill stores content as HTML
  const [deadline, setDeadline] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { isConnected, address } = useAccount();

  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toISOString().slice(0, 16); // Returns format 'YYYY-MM-DDTHH:MM'
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConnected || !address) {
      toast.error("Connect your wallet to continue");
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    try {
      const tx = await writeContract(config, {
        address: deployedAddress,
        abi: ABI,
        functionName: 'createProposal',
        args: [title, description, BigInt(new Date(deadline).getTime() / 1000)], // Pass the description as HTML
      });

      toast.success('Proposal created successfully!');
      console.log('Transaction sent:', tx);
      router.push('/proposals/userproposals');
    } catch (error) {
      console.error('Error creating proposal:', error);
      toast.error('Error creating proposal!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="create-proposal-container">
      <form onSubmit={handleSubmit}>
        <h1>Create Relief Proposal</h1>
        <div>
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Description:
            <QuillNoSSRWrapper
              value={description}
              onChange={setDescription} // Quill passes formatted text
              theme="snow"
            />
              
          </label>
        </div>
        <div>
          <span>
            Set your voting deadline to provide sufficient time for community members to review and vote.
            <br />
            Note: To secure funding or donations, your proposal must receive either an equal or greater number of "For" votes compared to "Against" votes.
          </span>
          <br />
          <br />
          <label>
            Voting Deadline:
            <input
              type="datetime-local"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              min={getCurrentDateTime()}
              required
            />
          </label>
        </div>
        <button type="submit" disabled={isLoading}>Create Proposal</button>
        {isLoading && <p>Creating proposal, please wait...</p>}
      </form>
    </div>
  );
};

export default CreateProposal;
