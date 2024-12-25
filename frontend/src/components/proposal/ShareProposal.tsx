import React from "react";
import { toast } from "react-toastify";

interface ShareProposalProps {
  proposalId: string | undefined; // The ID of the current proposal
}

const ShareProposal: React.FC<ShareProposalProps> = ({ proposalId }) => {
  const shareLink = typeof window !== "undefined" ? `${window.location.origin}/proposals/${proposalId}` : "";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareLink).then(() => {
      toast.success("Link copied to clipboard!");
    }).catch(() => {
      toast.error("Failed to copy link.");
    });
  };

  const shareOnX = () => {
    const xShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      `This disaster relief proposal is more than just an idea—it’s a lifeline for those in need. Your generous donation can make a world of difference. Join us in making this vision a reality. Every contribution counts, no matter how big or small: ${shareLink}`
    )}`;
    window.open(xShareUrl, "_blank");
  };

  
  const shareOnFacebook = () => {
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareLink)}`;
    window.open(facebookShareUrl, "_blank");
  };

  return (
    <div className="share-proposal-container">
      <h3>Share this Proposal</h3>
      <p>Help spread the word and gather more support!</p>
      <div className="share-buttons">
        <button onClick={copyToClipboard}>Copy Link</button>
        <button onClick={shareOnX}>Share on X</button>
        <button onClick={shareOnFacebook}>Share on Facebook</button>
      </div>
      <style jsx>{`
        .share-proposal-container {
          margin-top: 20px;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 8px;
          text-align: center;
        }
        .share-buttons button {
          margin: 5px;
          padding: 10px 15px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          background-color: #0070f3;
          color: white;
          font-size: 14px;
        }
        .share-buttons button:hover {
          background-color: #005bb5;
        }
      `}</style>
    </div>
  );
};

export default ShareProposal;
