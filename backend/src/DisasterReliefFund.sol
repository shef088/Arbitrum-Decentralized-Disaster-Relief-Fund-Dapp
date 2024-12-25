// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract DisasterReliefFund {
    struct Donation {
        uint128 amount;  
        uint256 proposalId;
        uint64 timestamp;
    }

    struct Withdrawal {
        uint128 amount;  
        uint256 proposalId;
        uint64 timestamp;
    }

    struct Proposal {
        uint256 id;
        address proposer;
        string title;
        string description;
        uint128 votesFor;  
        uint128 votesAgainst;  
        bool votingPassed;
        uint64 votingDeadline;  
        uint128 fundsReceived;  
        uint128 overallFundsReceived;  
        bool executed;
        bool archived;
        uint64 dateCreated;  
    }

    mapping(uint256 => Proposal) public proposals;
    mapping(uint256 => mapping(address => bool)) public hasVoted;
    mapping(uint256 => mapping(address => bool)) public userVote;
    mapping(address => uint256[]) public userProposals;
    mapping(uint256 => mapping(address => uint256)) public donations;
    mapping(address => Donation[]) public userDonations;
    mapping(address => Withdrawal[]) public userWithdrawals;

    mapping(bytes32 => uint256[]) public titleToProposalIds;
    mapping(address => bool) public authorizedGovernance;
    address public owner;
    address[] public governanceAddresses;

    uint256 public proposalCount;
    uint128 public totalPot;  

    event ProposalCreated(uint256 proposalId, string title, string description);
    event Voted(uint256 proposalId, address voter, bool support);
    event ProposalExecuted(uint256 proposalId, bool votingPassed);
    event ProposalRecreated(uint256 originalProposalId, uint256 newProposalId);
    event DonationReceived(uint256 proposalId, address donor, uint256 amount);
    event FundsAllocated(uint256 amount, address recipient);
    event WithdrawalMade(address user, uint256 amount, uint256 proposalId);

    modifier onlyGovernance() {
        require(
            authorizedGovernance[msg.sender],
            "Caller is not authorized governance"
        );
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not the owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    /**
    @dev Creates a new proposal with title, description and voting deadline.
    Emits ProposalCreated event upon success.
    */
    function createProposal(
        string memory _title,
        string memory _description,
        uint64 _votingDeadline
    ) public returns (uint256) {
        require(
            _votingDeadline > block.timestamp,
            "Voting deadline must be in the future"
        );

        proposalCount++;
        proposals[proposalCount] = Proposal({
            id: proposalCount, // Automatically set id to proposalCount
            proposer: msg.sender,
            title: _title,
            description: _description,
            votesFor: 0,
            votesAgainst: 0,
            votingDeadline: _votingDeadline,
            fundsReceived: 0,
            overallFundsReceived: 0,
            executed: false,
            archived: false,
            votingPassed: false,
            dateCreated: uint64(block.timestamp)
        });

        userProposals[msg.sender].push(proposalCount);

        // Normalize the title to lowercase and hash it
        bytes32 titleHash = keccak256(abi.encodePacked(toLowerCase(_title)));

        titleToProposalIds[titleHash].push(proposalCount); // Store the proposal ID under the title hash

        emit ProposalCreated(proposalCount, _title, _description);
        return proposalCount;
    }


    /**
    @dev Retrieves a paginated list of executed proposals.
    Emits no events upon success.
    */
    function getExecutedProposals(
        uint256 start,
        uint256 count
    ) public view returns (Proposal[] memory, uint256) {
        uint256 executedCount = 0;
        uint256 totalExecuted = 0;

        // First pass to determine total executed proposals
        for (uint256 k = 1; k <= proposalCount; k++) {
            if (proposals[k].executed) {
                totalExecuted++;
            }
        }

        // Adjust start if out of bounds
        if (start >= totalExecuted) {
            return (new Proposal[](0), totalExecuted);
        }

        // Allocate memory for the paginated result
        Proposal[] memory paginatedProposals = new Proposal[](count);

        // Second pass to collect proposals starting from `start` up to `count`
        uint256 j = 0;
        for (uint256 i = 1; i <= proposalCount && j < count; i++) {
            if (proposals[i].executed) {
                if (executedCount >= start) {
                    paginatedProposals[j] = proposals[i];
                    j++;
                }
                executedCount++;
            }
        }

        return (paginatedProposals, totalExecuted);
    }


    /**
    @dev Retrieves a paginated list of non-executed proposals.
    Emits no events upon success.
    */
    function getNonExecutedProposals(
        uint256 start,
        uint256 count
    ) public view returns (Proposal[] memory, uint256) {
        uint256 nonExecutedCount = 0;
        uint256 totalNonExecuted = 0;

        // First pass to determine total non-executed proposals
        for (uint256 k = 1; k <= proposalCount; k++) {
            if (!proposals[k].executed) {
                totalNonExecuted++;
            }
        }

        // Adjust start if out of bounds
        if (start >= totalNonExecuted) {
            return (new Proposal[](0), totalNonExecuted);
        }

        // Allocate memory for the paginated result
        Proposal[] memory paginatedProposals = new Proposal[](count);

        // Second pass to collect proposals starting from `start` up to `count`
        uint256 j = 0;
        for (uint256 i = 1; i <= proposalCount && j < count; i++) {
            if (!proposals[i].executed) {
                if (nonExecutedCount >= start) {
                    paginatedProposals[j] = proposals[i];
                    j++;
                }
                nonExecutedCount++;
            }
        }

        return (paginatedProposals, totalNonExecuted);
    }


    /**
    @dev Retrieves a paginated list of proposals created by the specified user.
    Emits no events upon success.
    */
    function getUserProposals(
        address _user,
        uint256 start,
        uint256 count
    ) public view returns (uint256[] memory, uint256) {
        uint256[] storage userProposalsArray = userProposals[_user];
        uint256 length = userProposalsArray.length;

        // Check if the start index is out of bounds
        if (start >= length) {
            return (new uint256[](0), length); // Return an empty array
        }

        // Calculate the end index, ensuring it doesn't exceed the array length
        uint256 end = start + count;
        if (end > length) {
            end = length;
        }

        // Create a new array to store the paginated results
        uint256[] memory paginatedProposals = new uint256[](end - start);

        // Iterate through the array segment and copy the elements
        for (uint256 i = 0; i < end - start; i++) {
            uint256 currentIndex = start + i;
            paginatedProposals[i] = userProposalsArray[currentIndex];
        }

        return (paginatedProposals, length);
    }


    /**
    @dev Converts a string to lowercase.
    This is an internal helper function that converts each character in the input string to its corresponding lowercase equivalent,
    if it exists, preserving non-alphabet characters as they are.
    */
    function toLowerCase(
        string memory str
    ) internal pure returns (string memory) {
        bytes memory bStr = bytes(str);
        bytes memory bLower = new bytes(bStr.length);
        for (uint256 i = 0; i < bStr.length; i++) {
            // Check if the character is uppercase
            if ((bStr[i] >= 0x41) && (bStr[i] <= 0x5A)) {
                // Convert to lowercase
                bLower[i] = bytes1(uint8(bStr[i]) + 32);
            } else {
                bLower[i] = bStr[i];
            }
        }
        return string(bLower);
    }


    /**
    @dev Searches proposals based on a title and returns paginated results.
    This is an internal helper function that takes in a proposal title, start index,
    count of proposals to return per page, and returns the list of matching Proposal structs along with their total count.
    */
    function searchProposals(
        string memory _title,
        uint256 start,
        uint256 count
    ) public view returns (Proposal[] memory, uint256) {
        require(start >= 0, "Start index must be non-negative");
        require(count >= 0, "Count must be non-negative");
        bytes32 titleHash = keccak256(abi.encodePacked(toLowerCase(_title)));

        uint256[] storage proposalIds = titleToProposalIds[titleHash];
        uint256 totalProposals = proposalIds.length;

        // Early exit if there are no proposals with this title
        if (totalProposals == 0) {
            return (new Proposal[](0), 0); // Return an empty array and 0 count
        }

        // Check if the start index is out of bounds
        if (start >= totalProposals) {
            return (new Proposal[](0), totalProposals); // Return an empty array and the total count
        }

        // Calculate the end index, ensuring it doesn't exceed the array length
        uint256 end = start + count;
        if (end > totalProposals) {
            end = totalProposals;
        }

        // Create a new array to store the paginated results
        Proposal[] memory paginatedProposals = new Proposal[](end - start);

        // Iterate through the proposal IDs and fetch the corresponding proposals
        for (uint256 index = start; index < end; index++) {
            uint256 proposalId = proposalIds[index];
            paginatedProposals[index - start] = proposals[proposalId];
        }

        return (paginatedProposals, totalProposals);
    }

    
    /**
    @dev Retrieves a user's funds summary, including total received and withdrawn.
    This view-only function returns two uint128 values: totalReceived (the sum of all donations made to proposals created by this user)
    and totalWithdrawn (the amount allocated from the pot for withdrawals initiated by this user).
    */
    function getUserFundsSummary(
        address _user
    )
        public
        view
        returns (uint128 totalFundsReceived, uint128 totalFundsWithdrawn)
    {
        // Calculate total funds received
        uint256[] storage proposalsByUser = userProposals[_user];
        totalFundsReceived = 0;
        for (uint256 i = 0; i < proposalsByUser.length; i++) {
            uint256 proposalId = proposalsByUser[i];
            totalFundsReceived += proposals[proposalId].overallFundsReceived;
        }

        // Calculate total funds withdrawn
        Withdrawal[] storage userWithdrawalsArray = userWithdrawals[_user];
        totalFundsWithdrawn = 0;
        for (uint256 i = 0; i < userWithdrawalsArray.length; i++) {
            totalFundsWithdrawn += userWithdrawalsArray[i].amount;
        }

        return (totalFundsReceived, totalFundsWithdrawn);
    }


    /**
    @dev Donates to a proposal.
    Emits DonationReceived event upon success.
    */
    function donateToProposal(uint256 _proposalId) public payable {
        require(
            _proposalId > 0 && _proposalId <= proposalCount,
            "Proposal does not exist"
        );
        require(!proposals[_proposalId].archived, "Proposal is archived");
        require(
            msg.value >= 0.00001 ether,
            "Donation must be greater than 0.00 ETH"
        );

        proposals[_proposalId].fundsReceived += uint128(msg.value);
        proposals[_proposalId].overallFundsReceived += uint128(msg.value);
        donations[_proposalId][msg.sender] += msg.value;
        totalPot += uint128(msg.value);

        userDonations[msg.sender].push(
            Donation({
                amount: uint128(msg.value),
                proposalId: _proposalId,
                timestamp: uint64(block.timestamp)
            })
        );

        emit DonationReceived(_proposalId, msg.sender, msg.value);
    }


    /**
    @dev Retrieves a user's donation history, including paginated results.
    This view-only function allows users to retrieve their past donations,
    with options to specify pagination parameters (start index and count).
    */
    function getUserDonations(
        address _user,
        uint256 _start,
        uint256 _count
    )
        public
        view
        returns (Donation[] memory donationList, uint256 totalDonations)
    {
        totalDonations = userDonations[_user].length;

        // Ensure the start index is within bounds
        if (_start >= totalDonations) {
            return (new Donation[](0), totalDonations);
        }

        // Calculate the end index, ensuring it doesn't exceed the total length
        uint256 end = _start + _count;
        if (end > totalDonations) {
            end = totalDonations;
        }

        uint256 donationCount = end - _start;
        Donation[] memory result = new Donation[](donationCount);

        for (uint256 i = 0; i < donationCount; i++) {
            result[i] = userDonations[_user][_start + i];
        }

        return (result, totalDonations);
    }


    /**
    @dev Retrieves a user's withdrawal history, including paginated results.
    This view-only function allows users to retrieve their past withdrawals,
    with options to specify pagination parameters (start index and count).
    */
    function getUserWithdrawals(
        address _user,
        uint256 start,
        uint256 count
    ) public view returns (Withdrawal[] memory, uint256) {
        Withdrawal[] storage withdrawalsList = userWithdrawals[_user];
        uint256 length = withdrawalsList.length;

        // Check if the start index is out of bounds
        if (start >= length) {
            return (new Withdrawal[](0), length); // Return an empty array and the total length
        }

        // Calculate the end index, ensuring it doesn't exceed the array length
        uint256 end = start + count;
        if (end > length) {
            end = length;
        }

        // Create a new array to store the paginated results
        Withdrawal[] memory paginatedWithdrawals = new Withdrawal[](
            end - start
        );

        // Iterate through the array segment and copy the elements
        for (uint256 i = 0; i < end - start; i++) {
            paginatedWithdrawals[i] = withdrawalsList[start + i];
        }

        return (paginatedWithdrawals, length);
    }


    /**
    @dev Vote on a proposal.
    This is an internal helper function that allows users to cast their votes in favor of or against proposals,
    as long as they have not voted before and the voting period has not ended yet.
    */
    function vote(uint256 _proposalId, bool _support) public {
        require(
            _proposalId > 0 && _proposalId <= proposalCount,
            "Proposal does not exist"
        );
        require(!proposals[_proposalId].archived, "Proposal is archived");
        require(
            block.timestamp < proposals[_proposalId].votingDeadline,
            "Voting period has ended"
        );

        bool previousVote = userVote[_proposalId][msg.sender];

        if (hasVoted[_proposalId][msg.sender]) {
            if (previousVote == _support) {
                revert("Already voted with this choice for this proposal.");
            } else {
                if (_support) {
                    proposals[_proposalId].votesFor++;
                    proposals[_proposalId].votesAgainst--;
                } else {
                    proposals[_proposalId].votesFor--;
                    proposals[_proposalId].votesAgainst++;
                }
            }
        } else {
            hasVoted[_proposalId][msg.sender] = true;

            if (_support) {
                proposals[_proposalId].votesFor++;
            } else {
                proposals[_proposalId].votesAgainst++;
            }
        }

        userVote[_proposalId][msg.sender] = _support;

        emit Voted(_proposalId, msg.sender, _support);
    }

    
    /**
    * @dev Execute a proposal.
    This view-only function allows proposals to be executed when their voting period has ended and they have passed,
    allocating funds from the pot accordingly, as well as tracking withdrawals for governance purposes.
    */
    function executeProposal(uint256 _proposalId) public {
        require(
            _proposalId > 0 && _proposalId <= proposalCount,
            "Proposal does not exist"
        );
        require(!proposals[_proposalId].archived, "Proposal is archived");
        require(
            block.timestamp >= proposals[_proposalId].votingDeadline,
            "Voting period not ended"
        );
        require(!proposals[_proposalId].executed, "Already executed");

        Proposal storage proposal = proposals[_proposalId];
        bool votingPassed = proposal.votesFor >= proposal.votesAgainst;
        proposal.votingPassed = votingPassed;
        proposal.executed = true;
        if (!votingPassed) {
            // Archive the proposal if it does not pass
            proposal.archived = true;
        }

        emit ProposalExecuted(_proposalId, votingPassed);
    }

    
    /**
    @dev Recreate a proposal.
    This view-only function allows proposals to be recreated when they are archived, with options to specify pagination parameters (start index and count).
    */
    function recreateProposal(uint256 _originalProposalId) public {
        require(
            _originalProposalId > 0 && _originalProposalId <= proposalCount,
            "Proposal does not exist"
        );
        Proposal memory originalProposal = proposals[_originalProposalId];
        require(originalProposal.archived, "Proposal must be archived first");
        require(
            msg.sender == originalProposal.proposer,
            "Only proposer can recreate"
        );

        proposalCount++;
        proposals[proposalCount] = Proposal({
            id: proposalCount,
            proposer: msg.sender,
            title: originalProposal.title,
            description: originalProposal.description,
            votesFor: 0,
            votesAgainst: 0,
            votingDeadline: uint64(block.timestamp) + 1 days,
            fundsReceived: 0,
            overallFundsReceived: 0,
            executed: false,
            archived: false,
            votingPassed: false,
            dateCreated: uint64(block.timestamp)
        });

        userProposals[msg.sender].push(proposalCount);

        emit ProposalRecreated(_originalProposalId, proposalCount);
        emit ProposalCreated(
            proposalCount,
            originalProposal.title,
            originalProposal.description
        );
    }

    
    /**
    @dev Checks and executes expired proposals.
    This is an internal helper function that iterates through all existing proposals,
    identifies those whose voting period has ended, and initiates their execution according to governance rules.
    */
    function checkExpiredProposals() public {
        for (uint256 i = 1; i <= proposalCount; i++) {
            Proposal storage proposal = proposals[i];
            if (
                !proposal.executed && block.timestamp >= proposal.votingDeadline
            ) {
                executeProposal(i);
            }
        }
    }

    
    /**
    * @dev Retrieves a proposal by its ID.
    This view-only function allows users to fetch details about specific proposals, ensuring that the provided proposalId is within valid range and not archived.
    */
    function getProposal(
        uint256 _proposalId
    ) public view returns (Proposal memory) {
        require(
            _proposalId > 0 && _proposalId <= proposalCount,
            "Proposal does not exist"
        );
        return proposals[_proposalId];
    }

    
    /**
    @dev Allocates funds from the pot to a specified recipient.
    This governance-only function allows authorized addresses to transfer amounts directly into users' accounts, effectively allocating from the overall fund pool managed by this contract.

    Parameters:

    amount: The amount of Ether (in wei) that will be transferred. It's expected that this value is already in wei and not as an ether string representation.
    Requirements:

    Only governance addresses are allowed to call this function
    The requested transfer must fit within the current balance available in the pot
    Emits a FundsAllocated event upon success, containing information about both the amount allocated and its recipient address. 
    */
        function allocateFromPot(
        uint256 amount,
        address recipient
    ) public onlyGovernance {
        require(amount <= totalPot, "Insufficient funds in the pot");
        totalPot -= uint128(amount);
        payable(recipient).transfer(amount);

        emit FundsAllocated(amount, recipient);
    }

    
    /**
    @dev Allocates funds from a proposal to its proposer.
    This is an internal helper function that allows proposals with passed voting periods and allocated funds,
    to have their remaining balance transferred directly into the account of their respective proposers after executing them.

    Parameters:

    _proposalId: The unique identifier for this specific proposal, used as reference throughout contract operations
    finalAmount: After calculating platform cuts (3% in favor), determines how much should be left with the fund pool
    Requirements:

    Only governance addresses are allowed to call this function.

    Emits a FundsAllocated event upon success, containing information about both the amount allocated and its recipient address. 
    */
    function allocateFundsToProposer(uint256 _proposalId) public {
        require(
            _proposalId > 0 && _proposalId <= proposalCount,
            "Proposal does not exist"
        );

        Proposal storage proposal = proposals[_proposalId];
        require(
            msg.sender == proposal.proposer,
            "Only the proposer can withdraw allocated funds"
        );
        require(
            proposal.executed,
            "Proposal must be executed before funds can be allocated"
        );
        require(
            proposal.votingPassed,
            "Proposal must have passed to allocate funds"
        );
        require(
            proposal.fundsReceived > 0,
            "No funds available for allocation"
        );

        uint128 allocation = proposal.fundsReceived;
        uint128 platformCut = (allocation * 3) / 100; // 3% cut
        uint128 finalAmount = allocation - platformCut;

        totalPot -= allocation;
        payable(proposal.proposer).transfer(finalAmount); // Transfer to proposer after cut

        // Track the withdrawal
        userWithdrawals[proposal.proposer].push(
            Withdrawal({
                amount: finalAmount,
                proposalId: _proposalId,
                timestamp: uint64(block.timestamp)
            })
        );

        proposal.fundsReceived = 0; // Reset funds received after allocation
        emit FundsAllocated(finalAmount, proposal.proposer);
        emit WithdrawalMade(proposal.proposer, finalAmount, _proposalId); // Emit the withdrawal event
    }

    
    /**
    * @dev Archive a proposal.
    This is an internal helper function that allows proposers to mark their proposals as archived,
    effectively removing them from active lists and preventing further voting or execution attempts.

    Parameters:

    _proposalId: The unique identifier for the specific proposal, used throughout contract operations
    Requirements:

    The provided _proposalId must be within valid range.
    Only the original proposer is allowed to call this function.

    */
    function archiveProposal(uint256 _proposalId) public {
        require(
            _proposalId > 0 && _proposalId <= proposalCount,
            "Proposal does not exist"
        );
        require(
            msg.sender == proposals[_proposalId].proposer,
            "Only proposer can archive"
        );
        proposals[_proposalId].archived = true;
    }

    
    /**
    * @dev Authorize a new governance address.
    This is an internal helper function that allows authorized addresses to add more users with governance rights,
    ensuring they have not been previously added and allowing only the owner of this contract to perform such actions.

    Parameters:

    _governanceAddress: The unique identifier for the specified user, used as reference throughout contract operations
    Requirements:

    The provided _proposalId must be within valid range.
    Only the original proposer is allowed to call this function.
     */
    function authorizeGovernance(address _governanceAddress) public onlyOwner {
        require(
            !authorizedGovernance[_governanceAddress],
            "Already authorized"
        );
        authorizedGovernance[_governanceAddress] = true;
        governanceAddresses.push(_governanceAddress); // Add to the array of governance addresses
    }

    /**
    @dev Retrieves all addresses with governance rights.
    This view-only function returns an array of address type containing all currently authorized users who have been granted governance permissions within this contract.

    Parameters:
    None

    Requirements:

    None

    Returns: An array (memory) of address types.
     */
    function getGovernanceAddresses() public view returns (address[] memory) {
        return governanceAddresses;
    }


    /**
    * @dev Revoke a user's governance access.

    This is an internal helper function that allows authorized addresses to remove users from having governance rights,
    ensuring they have not been previously removed and allowing only the owner of this contract to perform such actions.

    Parameters:

    _governanceAddress: The unique identifier for the specified user, used as reference throughout contract operations
    Requirements:

    The provided _proposalId must be within valid range.
    Only the original proposer is allowed to call this function.
     */
    function revokeGovernance(address _governanceAddress) public onlyOwner {
        require(
            authorizedGovernance[_governanceAddress],
            "Not an authorized governance address"
        );
        authorizedGovernance[_governanceAddress] = false;

        // Remove address from the array (optional; requires additional logic)
        for (uint256 i = 0; i < governanceAddresses.length; i++) {
            if (governanceAddresses[i] == _governanceAddress) {
                governanceAddresses[i] = governanceAddresses[
                    governanceAddresses.length - 1
                ]; // Move the last element to the removed spot
                governanceAddresses.pop(); // Remove the last element
                break;
            }
        }
    }
}
