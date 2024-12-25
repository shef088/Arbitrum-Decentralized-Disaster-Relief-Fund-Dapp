import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import ApprovedProposals from "./proposals/approved";

const Home = () => {
    const { isConnected } = useAccount();

    return (
        <>
        {isConnected ? <ApprovedProposals/> :
        <div className="home-container">
            <div className="home-hero">
                <h1 className="home-hero-title">Disaster Relief Fund</h1>
                <p className="home-hero-subtitle">Join the fight against the devastating impacts of natural disasters and humanitarian crisis. Your voice matters!</p>
                <p className="home-hero-description">
                    Empower communities through a decentralized platform built on the Arbitrum network, enabling transparent proposals and contributions for effective disaster response.
                </p>
                <div className="home-hero-action">
                    <h2>Be the Change</h2>
                    <p>
                        Connect your wallet to propose initiatives, donate, and ensure your contributions reach those who need it most.
                    </p>
                </div>
            </div>

            {isConnected ? (
                <div className="home-welcome-msg">

                    <p>
                        Your commitment to relief and recovery starts now. Explore relief proposals addressing urgent needs in disaster-stricken areas.
                    </p>
                    <p>
                        Vote, create disaster relief proposals, donate to victims. and collaborate with a passionate community dedicated to making a difference. Every action strengthens our mission for timely disaster response.
                    </p>
                </div>
            ) : (
                <div className="home-connect-section">
                    <h2>Connect to Ignite Change</h2>
                    <p>
                        Ready to make a difference? Connect your wallet to join a decentralized community focused on impactful disaster relief.
                    </p>
                    <ConnectButton />
                    <p className="home-note">
                        Your participation is crucial—let's redefine how we respond to crises, together.
                    </p>
                </div>
            )}
        </div>
        }
        </>
    );
};

export default Home;
