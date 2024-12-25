import React, { useEffect, useState } from 'react';
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useAccountEffect } from "wagmi";
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faClipboardList, faHandsHelping, faThumbsDown, faUser, faGem, faUsersCog, faSearch, faCoins, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const Header: React.FC = () => {
    const { isConnected } = useAccount();
    const [account, setAccount] = useState<string | undefined>(undefined);
    const router = useRouter();
    const [visible, setVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [navVisible, setNavVisible] = useState(false); // Initially hide second navigation

    useAccountEffect({
        onConnect(data) {
            setAccount(data.address);
            toast.success("Account connected");
        },
        onDisconnect() {
            toast.error("Account Disconnected");
            setAccount(undefined);
        },
    });

    const isActive = (path: string) => router.pathname === path;

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY) {
                setVisible(false); // Hide header
            } else {
                setVisible(true); // Show header
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]);

    // Toggle the visibility of the second navigation (hamburger menu)
    const toggleNav = () => {
        setNavVisible(!navVisible);
    };

    // Close the second navigation when a link is clicked on small screens
    const handleLinkClick = () => {
        setNavVisible(false); // Close navigation
    };

    return (
        <header className={`header ${visible ? 'visible' : 'hidden'}`}>
            <Head>
                <title>Disaster Relief Fund | Transforming Aid through Decentralized Solutions</title>
                <meta 
                    name="description" 
                    content="Join the Disaster Relief Fund on Arbitrum to empower communities impacted by natural disasters. Propose, vote, and donate transparently." 
                />
            </Head>
            <div className="header-box">
                <div className="logo">
                  <Link href="/">   
                      <h1>Disaster Relief Fund</h1> 
                  </Link>
                </div>
                <div className="connect-btn">
                    <ConnectButton />
                </div>
            </div>
            {/* Hamburger Icon visible only on small screens */}
            <div className="hamburger" onClick={toggleNav}>
                <FontAwesomeIcon icon={navVisible ? faTimes : faBars} /> {/* Switch between Bars and Times */}
            </div>

            {/* Main Navigation (visible on large screens only) */}
            <nav className="navigation">
                <Link href="/proposals/create" className={isActive('/proposals/create') ? 'active' : ''}>
                    <FontAwesomeIcon icon={faPlus} /> Create Proposal
                </Link>
                <Link href="/proposals/pending" className={isActive('/proposals/pending') ? 'active' : ''}>
                    <FontAwesomeIcon icon={faClipboardList} /> Vote on Proposals
                </Link>
                <Link href="/proposals/approved" className={isActive('/proposals/approved') ? 'active' : ''}>
                    <FontAwesomeIcon icon={faHandsHelping} /> Donate to Proposals
                </Link>
                <Link href="/proposals/rejected" className={isActive('/proposals/rejected') ? 'active' : ''}>
                    <FontAwesomeIcon icon={faThumbsDown} /> Rejected Proposals
                </Link>
                <Link href="/proposals/search" className={isActive('/proposals/search') ? 'active' : ''}>
                    <FontAwesomeIcon icon={faSearch} /> Search
                </Link>
                {isConnected && <Link href="/proposals/userproposals" className={isActive('/proposals/userproposals') ? 'active' : ''}>
                    <FontAwesomeIcon icon={faUser} /> My Proposals
                </Link>}
                {isConnected && <Link href="/donations/user-donations" className={isActive('/donations/user-donations') ? 'active' : ''}>
                    <FontAwesomeIcon icon={faGem} /> Donations
                </Link>}
                {isConnected && <Link href="/donations/withdrawal-history" className={isActive('/donations/withdrawal-history') ? 'active' : ''}>
                    <FontAwesomeIcon icon={faCoins} /> Withdrawals
                </Link>}
                {isConnected && <Link href="/proposals/advanced-ops" className={isActive('/proposals/advanced-ops') ? 'active' : ''}>
                    <FontAwesomeIcon icon={faUsersCog} /> Advanced
                </Link>}
                {isConnected && <Link href="/governance" className={isActive('/governance') ? 'active' : ''}>
                    <FontAwesomeIcon icon={faUsersCog} /> Governance
                </Link>}
            </nav>

            {/* Second Navigation (visible on small screens when hamburger is clicked) */}
            {navVisible && (
                <nav className="navigation-second">
                    <Link href="/proposals/create" className={isActive('/proposals/create') ? 'active' : ''} onClick={handleLinkClick}>
                        <FontAwesomeIcon icon={faPlus} /> Create Proposal
                    </Link>
                    <Link href="/proposals/pending" className={isActive('/proposals/pending') ? 'active' : ''} onClick={handleLinkClick}>
                        <FontAwesomeIcon icon={faClipboardList} /> Vote on Proposals
                    </Link>
                    <Link href="/proposals/approved" className={isActive('/proposals/approved') ? 'active' : ''} onClick={handleLinkClick}>
                        <FontAwesomeIcon icon={faHandsHelping} /> Donate to Proposals
                    </Link>
                    <Link href="/proposals/rejected" className={isActive('/proposals/rejected') ? 'active' : ''} onClick={handleLinkClick}>
                        <FontAwesomeIcon icon={faThumbsDown} /> Rejected Proposals
                    </Link>
                    <Link href="/proposals/search" className={isActive('/proposals/search') ? 'active' : ''} onClick={handleLinkClick}>
                        <FontAwesomeIcon icon={faSearch} /> Search
                    </Link>
                    {isConnected && <Link href="/proposals/userproposals" className={isActive('/proposals/userproposals') ? 'active' : ''} onClick={handleLinkClick}>
                        <FontAwesomeIcon icon={faUser} /> My Proposals
                    </Link>}
                    {isConnected && <Link href="/donations/user-donations" className={isActive('/donations/user-donations') ? 'active' : ''} onClick={handleLinkClick}>
                        <FontAwesomeIcon icon={faGem} /> Donations
                    </Link>}
                    {isConnected && <Link href="/donations/withdrawal-history" className={isActive('/donations/withdrawal-history') ? 'active' : ''} onClick={handleLinkClick}>
                        <FontAwesomeIcon icon={faCoins} /> Withdrawals
                    </Link>}
                    {isConnected && <Link href="/proposals/advanced-ops" className={isActive('/proposals/advanced-ops') ? 'active' : ''} onClick={handleLinkClick}>
                        <FontAwesomeIcon icon={faUsersCog} /> Advanced
                    </Link>}
                    {isConnected && <Link href="/governance" className={isActive('/governance') ? 'active' : ''} onClick={handleLinkClick}>
                        <FontAwesomeIcon icon={faUsersCog} /> Governance
                    </Link>}
                </nav>
            )}
        </header>
    );
};

export default Header;
