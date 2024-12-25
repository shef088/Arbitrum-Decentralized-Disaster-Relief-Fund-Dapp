import { useEffect, useState } from 'react';
import { readContract } from "@wagmi/core";
import config from "../../wagmi";
import { ABI, deployedAddress } from "../../contracts/deployed-contract";
import { useAccount } from 'wagmi';
import { ethers } from 'ethers';
import Link from 'next/link';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';
import Pagination from '../../components/Pagination'; // Import the Pagination component

interface Donation {
    amount: string;
    proposalId: number;
}

const UserDonations = () => {
    const { isConnected, address } = useAccount();
    const [donations, setDonations] = useState<Donation[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const [start, setStart] = useState(0); // Start index for pagination
    const count = 5; // Number of items per page
    const [totalItems, setTotalItems] = useState(0); // Total items for pagination
    const [currentPage, setCurrentPage] = useState(0); // Track current page

    useEffect(() => {
        fetchUserDonations();
    }, [address, start]); // Refetch whenever address or start changes

    const fetchUserDonations = async () => {
        if (!isConnected || !address) {
            toast.error("Connect your wallet to continue");
            setLoading(false); // Stop loading when the error occurs
            return; // Return early if not connected
        }
        setLoading(true);
      
        try {
            // Fetch paginated donations from the contract
            const [userDonations, totalDonations] = await readContract(config, {
                address: deployedAddress,
                abi: ABI,
                functionName: 'getUserDonations',
                args: [address as `0x${string}`, BigInt(start), BigInt(count)], // Pass start and count for pagination
            });

            // Type assertion to specify that userDonations is an array of objects with amount, proposalId, and timestamp
            const donationsArray = userDonations as { amount: bigint; proposalId: bigint; timestamp: bigint }[];

            // Format donations data
            const formattedDonations = donationsArray.map((donation) => ({
                amount: ethers.formatEther(donation.amount.toString()),
                proposalId: Number(donation.proposalId),
            }));

            // Set the donations and total items for pagination
            setDonations(formattedDonations);
            setTotalItems(Number(totalDonations)); // Ensure totalItems is correctly set from the contract
            setError(null);
        } catch (error) {
            console.error("Error fetching donations:", error);
            setError("Failed to fetch donations.");
        } finally {
            setLoading(false);
        }
    };

    // Handle page change
    const handlePageChange = (selectedPage: number) => {
        setStart(selectedPage * count);
        setCurrentPage(selectedPage); // Update the current page
    };
    if(!isConnected && !loading) return <div className="user-donations-container"><div className="error-message">Connect wallet to continue!</div></div>
   
    return (
        <div className="user-donations-container">
            <h1>Donations You Have Made</h1>
            {loading &&  <Loader />}
            {error && <div className="error-message">{error}</div>}
            {donations.length === 0   && !loading ? (
                <p className="no-donations">You have not made any donations yet.</p>
            ) : (
                <div className="donation-list">
                    {donations.map((donation, index) => (
                        <Link href={`/proposals/${donation.proposalId}`} key={index} className="donation-item">
                            <p>Proposal ID: {donation.proposalId}</p>
                            <p>Donation Amount: {donation.amount} ETH</p>
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

export default UserDonations;
