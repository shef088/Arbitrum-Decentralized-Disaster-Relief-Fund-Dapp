import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DisasterReliefFund
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const disasterReliefFundAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  {
    type: 'function',
    inputs: [
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'recipient', internalType: 'address', type: 'address' },
    ],
    name: 'allocateFromPot',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_proposalId', internalType: 'uint256', type: 'uint256' }],
    name: 'allocateFundsToProposer',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_proposalId', internalType: 'uint256', type: 'uint256' }],
    name: 'archiveProposal',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_governanceAddress', internalType: 'address', type: 'address' },
    ],
    name: 'authorizeGovernance',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'authorizedGovernance',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'checkExpiredProposals',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_title', internalType: 'string', type: 'string' },
      { name: '_description', internalType: 'string', type: 'string' },
      { name: '_votingDeadline', internalType: 'uint64', type: 'uint64' },
    ],
    name: 'createProposal',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_proposalId', internalType: 'uint256', type: 'uint256' }],
    name: 'donateToProposal',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    name: 'donations',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_proposalId', internalType: 'uint256', type: 'uint256' }],
    name: 'executeProposal',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'start', internalType: 'uint256', type: 'uint256' },
      { name: 'count', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getExecutedProposals',
    outputs: [
      {
        name: '',
        internalType: 'struct DisasterReliefFund.Proposal[]',
        type: 'tuple[]',
        components: [
          { name: 'id', internalType: 'uint256', type: 'uint256' },
          { name: 'proposer', internalType: 'address', type: 'address' },
          { name: 'title', internalType: 'string', type: 'string' },
          { name: 'description', internalType: 'string', type: 'string' },
          { name: 'votesFor', internalType: 'uint128', type: 'uint128' },
          { name: 'votesAgainst', internalType: 'uint128', type: 'uint128' },
          { name: 'votingPassed', internalType: 'bool', type: 'bool' },
          { name: 'votingDeadline', internalType: 'uint64', type: 'uint64' },
          { name: 'fundsReceived', internalType: 'uint128', type: 'uint128' },
          {
            name: 'overallFundsReceived',
            internalType: 'uint128',
            type: 'uint128',
          },
          { name: 'executed', internalType: 'bool', type: 'bool' },
          { name: 'archived', internalType: 'bool', type: 'bool' },
          { name: 'dateCreated', internalType: 'uint64', type: 'uint64' },
        ],
      },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getGovernanceAddresses',
    outputs: [{ name: '', internalType: 'address[]', type: 'address[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'start', internalType: 'uint256', type: 'uint256' },
      { name: 'count', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getNonExecutedProposals',
    outputs: [
      {
        name: '',
        internalType: 'struct DisasterReliefFund.Proposal[]',
        type: 'tuple[]',
        components: [
          { name: 'id', internalType: 'uint256', type: 'uint256' },
          { name: 'proposer', internalType: 'address', type: 'address' },
          { name: 'title', internalType: 'string', type: 'string' },
          { name: 'description', internalType: 'string', type: 'string' },
          { name: 'votesFor', internalType: 'uint128', type: 'uint128' },
          { name: 'votesAgainst', internalType: 'uint128', type: 'uint128' },
          { name: 'votingPassed', internalType: 'bool', type: 'bool' },
          { name: 'votingDeadline', internalType: 'uint64', type: 'uint64' },
          { name: 'fundsReceived', internalType: 'uint128', type: 'uint128' },
          {
            name: 'overallFundsReceived',
            internalType: 'uint128',
            type: 'uint128',
          },
          { name: 'executed', internalType: 'bool', type: 'bool' },
          { name: 'archived', internalType: 'bool', type: 'bool' },
          { name: 'dateCreated', internalType: 'uint64', type: 'uint64' },
        ],
      },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_proposalId', internalType: 'uint256', type: 'uint256' }],
    name: 'getProposal',
    outputs: [
      {
        name: '',
        internalType: 'struct DisasterReliefFund.Proposal',
        type: 'tuple',
        components: [
          { name: 'id', internalType: 'uint256', type: 'uint256' },
          { name: 'proposer', internalType: 'address', type: 'address' },
          { name: 'title', internalType: 'string', type: 'string' },
          { name: 'description', internalType: 'string', type: 'string' },
          { name: 'votesFor', internalType: 'uint128', type: 'uint128' },
          { name: 'votesAgainst', internalType: 'uint128', type: 'uint128' },
          { name: 'votingPassed', internalType: 'bool', type: 'bool' },
          { name: 'votingDeadline', internalType: 'uint64', type: 'uint64' },
          { name: 'fundsReceived', internalType: 'uint128', type: 'uint128' },
          {
            name: 'overallFundsReceived',
            internalType: 'uint128',
            type: 'uint128',
          },
          { name: 'executed', internalType: 'bool', type: 'bool' },
          { name: 'archived', internalType: 'bool', type: 'bool' },
          { name: 'dateCreated', internalType: 'uint64', type: 'uint64' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_user', internalType: 'address', type: 'address' },
      { name: '_start', internalType: 'uint256', type: 'uint256' },
      { name: '_count', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getUserDonations',
    outputs: [
      {
        name: 'donationList',
        internalType: 'struct DisasterReliefFund.Donation[]',
        type: 'tuple[]',
        components: [
          { name: 'amount', internalType: 'uint128', type: 'uint128' },
          { name: 'proposalId', internalType: 'uint256', type: 'uint256' },
          { name: 'timestamp', internalType: 'uint64', type: 'uint64' },
        ],
      },
      { name: 'totalDonations', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_user', internalType: 'address', type: 'address' }],
    name: 'getUserFundsSummary',
    outputs: [
      { name: 'totalFundsReceived', internalType: 'uint128', type: 'uint128' },
      { name: 'totalFundsWithdrawn', internalType: 'uint128', type: 'uint128' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_user', internalType: 'address', type: 'address' },
      { name: 'start', internalType: 'uint256', type: 'uint256' },
      { name: 'count', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getUserProposals',
    outputs: [
      { name: '', internalType: 'uint256[]', type: 'uint256[]' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_user', internalType: 'address', type: 'address' },
      { name: 'start', internalType: 'uint256', type: 'uint256' },
      { name: 'count', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getUserWithdrawals',
    outputs: [
      {
        name: '',
        internalType: 'struct DisasterReliefFund.Withdrawal[]',
        type: 'tuple[]',
        components: [
          { name: 'amount', internalType: 'uint128', type: 'uint128' },
          { name: 'proposalId', internalType: 'uint256', type: 'uint256' },
          { name: 'timestamp', internalType: 'uint64', type: 'uint64' },
        ],
      },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'governanceAddresses',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    name: 'hasVoted',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'proposalCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'proposals',
    outputs: [
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'proposer', internalType: 'address', type: 'address' },
      { name: 'title', internalType: 'string', type: 'string' },
      { name: 'description', internalType: 'string', type: 'string' },
      { name: 'votesFor', internalType: 'uint128', type: 'uint128' },
      { name: 'votesAgainst', internalType: 'uint128', type: 'uint128' },
      { name: 'votingPassed', internalType: 'bool', type: 'bool' },
      { name: 'votingDeadline', internalType: 'uint64', type: 'uint64' },
      { name: 'fundsReceived', internalType: 'uint128', type: 'uint128' },
      {
        name: 'overallFundsReceived',
        internalType: 'uint128',
        type: 'uint128',
      },
      { name: 'executed', internalType: 'bool', type: 'bool' },
      { name: 'archived', internalType: 'bool', type: 'bool' },
      { name: 'dateCreated', internalType: 'uint64', type: 'uint64' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_originalProposalId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'recreateProposal',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_governanceAddress', internalType: 'address', type: 'address' },
    ],
    name: 'revokeGovernance',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_title', internalType: 'string', type: 'string' },
      { name: 'start', internalType: 'uint256', type: 'uint256' },
      { name: 'count', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'searchProposals',
    outputs: [
      {
        name: '',
        internalType: 'struct DisasterReliefFund.Proposal[]',
        type: 'tuple[]',
        components: [
          { name: 'id', internalType: 'uint256', type: 'uint256' },
          { name: 'proposer', internalType: 'address', type: 'address' },
          { name: 'title', internalType: 'string', type: 'string' },
          { name: 'description', internalType: 'string', type: 'string' },
          { name: 'votesFor', internalType: 'uint128', type: 'uint128' },
          { name: 'votesAgainst', internalType: 'uint128', type: 'uint128' },
          { name: 'votingPassed', internalType: 'bool', type: 'bool' },
          { name: 'votingDeadline', internalType: 'uint64', type: 'uint64' },
          { name: 'fundsReceived', internalType: 'uint128', type: 'uint128' },
          {
            name: 'overallFundsReceived',
            internalType: 'uint128',
            type: 'uint128',
          },
          { name: 'executed', internalType: 'bool', type: 'bool' },
          { name: 'archived', internalType: 'bool', type: 'bool' },
          { name: 'dateCreated', internalType: 'uint64', type: 'uint64' },
        ],
      },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'bytes32', type: 'bytes32' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'titleToProposalIds',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalPot',
    outputs: [{ name: '', internalType: 'uint128', type: 'uint128' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'userDonations',
    outputs: [
      { name: 'amount', internalType: 'uint128', type: 'uint128' },
      { name: 'proposalId', internalType: 'uint256', type: 'uint256' },
      { name: 'timestamp', internalType: 'uint64', type: 'uint64' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'userProposals',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    name: 'userVote',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'userWithdrawals',
    outputs: [
      { name: 'amount', internalType: 'uint128', type: 'uint128' },
      { name: 'proposalId', internalType: 'uint256', type: 'uint256' },
      { name: 'timestamp', internalType: 'uint64', type: 'uint64' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_proposalId', internalType: 'uint256', type: 'uint256' },
      { name: '_support', internalType: 'bool', type: 'bool' },
    ],
    name: 'vote',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'proposalId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'donor',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'DonationReceived',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'recipient',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'FundsAllocated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'proposalId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'title', internalType: 'string', type: 'string', indexed: false },
      {
        name: 'description',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
    ],
    name: 'ProposalCreated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'proposalId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'votingPassed',
        internalType: 'bool',
        type: 'bool',
        indexed: false,
      },
    ],
    name: 'ProposalExecuted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'originalProposalId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'newProposalId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'ProposalRecreated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'proposalId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'voter',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      { name: 'support', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'Voted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'user',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'proposalId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'WithdrawalMade',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IMulticall3
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iMulticall3Abi = [
  {
    type: 'function',
    inputs: [
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'aggregate',
    outputs: [
      { name: 'blockNumber', internalType: 'uint256', type: 'uint256' },
      { name: 'returnData', internalType: 'bytes[]', type: 'bytes[]' },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call3[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'allowFailure', internalType: 'bool', type: 'bool' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'aggregate3',
    outputs: [
      {
        name: 'returnData',
        internalType: 'struct IMulticall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call3Value[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'allowFailure', internalType: 'bool', type: 'bool' },
          { name: 'value', internalType: 'uint256', type: 'uint256' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'aggregate3Value',
    outputs: [
      {
        name: 'returnData',
        internalType: 'struct IMulticall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'blockAndAggregate',
    outputs: [
      { name: 'blockNumber', internalType: 'uint256', type: 'uint256' },
      { name: 'blockHash', internalType: 'bytes32', type: 'bytes32' },
      {
        name: 'returnData',
        internalType: 'struct IMulticall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getBasefee',
    outputs: [{ name: 'basefee', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'blockNumber', internalType: 'uint256', type: 'uint256' }],
    name: 'getBlockHash',
    outputs: [{ name: 'blockHash', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getBlockNumber',
    outputs: [
      { name: 'blockNumber', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getChainId',
    outputs: [{ name: 'chainid', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getCurrentBlockCoinbase',
    outputs: [{ name: 'coinbase', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getCurrentBlockDifficulty',
    outputs: [{ name: 'difficulty', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getCurrentBlockGasLimit',
    outputs: [{ name: 'gaslimit', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getCurrentBlockTimestamp',
    outputs: [{ name: 'timestamp', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'addr', internalType: 'address', type: 'address' }],
    name: 'getEthBalance',
    outputs: [{ name: 'balance', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getLastBlockHash',
    outputs: [{ name: 'blockHash', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'requireSuccess', internalType: 'bool', type: 'bool' },
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'tryAggregate',
    outputs: [
      {
        name: 'returnData',
        internalType: 'struct IMulticall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'requireSuccess', internalType: 'bool', type: 'bool' },
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'tryBlockAndAggregate',
    outputs: [
      { name: 'blockNumber', internalType: 'uint256', type: 'uint256' },
      { name: 'blockHash', internalType: 'bytes32', type: 'bytes32' },
      {
        name: 'returnData',
        internalType: 'struct IMulticall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    stateMutability: 'payable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link disasterReliefFundAbi}__
 */
export const useReadDisasterReliefFundundefined =
  /*#__PURE__*/ createUseReadContract({ abi: disasterReliefFundAbi })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link disasterReliefFundAbi}__ and `functionName` set to `"authorizedGovernance"`
 */
export const useReadDisasterReliefFundAuthorizedGovernance =
  /*#__PURE__*/ createUseReadContract({
    abi: disasterReliefFundAbi,
    functionName: 'authorizedGovernance',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link disasterReliefFundAbi}__ and `functionName` set to `"donations"`
 */
export const useReadDisasterReliefFundDonations =
  /*#__PURE__*/ createUseReadContract({
    abi: disasterReliefFundAbi,
    functionName: 'donations',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link disasterReliefFundAbi}__ and `functionName` set to `"getExecutedProposals"`
 */
export const useReadDisasterReliefFundGetExecutedProposals =
  /*#__PURE__*/ createUseReadContract({
    abi: disasterReliefFundAbi,
    functionName: 'getExecutedProposals',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link disasterReliefFundAbi}__ and `functionName` set to `"getGovernanceAddresses"`
 */
export const useReadDisasterReliefFundGetGovernanceAddresses =
  /*#__PURE__*/ createUseReadContract({
    abi: disasterReliefFundAbi,
    functionName: 'getGovernanceAddresses',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link disasterReliefFundAbi}__ and `functionName` set to `"getNonExecutedProposals"`
 */
export const useReadDisasterReliefFundGetNonExecutedProposals =
  /*#__PURE__*/ createUseReadContract({
    abi: disasterReliefFundAbi,
    functionName: 'getNonExecutedProposals',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link disasterReliefFundAbi}__ and `functionName` set to `"getProposal"`
 */
export const useReadDisasterReliefFundGetProposal =
  /*#__PURE__*/ createUseReadContract({
    abi: disasterReliefFundAbi,
    functionName: 'getProposal',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link disasterReliefFundAbi}__ and `functionName` set to `"getUserDonations"`
 */
export const useReadDisasterReliefFundGetUserDonations =
  /*#__PURE__*/ createUseReadContract({
    abi: disasterReliefFundAbi,
    functionName: 'getUserDonations',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link disasterReliefFundAbi}__ and `functionName` set to `"getUserFundsSummary"`
 */
export const useReadDisasterReliefFundGetUserFundsSummary =
  /*#__PURE__*/ createUseReadContract({
    abi: disasterReliefFundAbi,
    functionName: 'getUserFundsSummary',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link disasterReliefFundAbi}__ and `functionName` set to `"getUserProposals"`
 */
export const useReadDisasterReliefFundGetUserProposals =
  /*#__PURE__*/ createUseReadContract({
    abi: disasterReliefFundAbi,
    functionName: 'getUserProposals',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link disasterReliefFundAbi}__ and `functionName` set to `"getUserWithdrawals"`
 */
export const useReadDisasterReliefFundGetUserWithdrawals =
  /*#__PURE__*/ createUseReadContract({
    abi: disasterReliefFundAbi,
    functionName: 'getUserWithdrawals',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link disasterReliefFundAbi}__ and `functionName` set to `"governanceAddresses"`
 */
export const useReadDisasterReliefFundGovernanceAddresses =
  /*#__PURE__*/ createUseReadContract({
    abi: disasterReliefFundAbi,
    functionName: 'governanceAddresses',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link disasterReliefFundAbi}__ and `functionName` set to `"hasVoted"`
 */
export const useReadDisasterReliefFundHasVoted =
  /*#__PURE__*/ createUseReadContract({
    abi: disasterReliefFundAbi,
    functionName: 'hasVoted',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link disasterReliefFundAbi}__ and `functionName` set to `"owner"`
 */
export const useReadDisasterReliefFundOwner =
  /*#__PURE__*/ createUseReadContract({
    abi: disasterReliefFundAbi,
    functionName: 'owner',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link disasterReliefFundAbi}__ and `functionName` set to `"proposalCount"`
 */
export const useReadDisasterReliefFundProposalCount =
  /*#__PURE__*/ createUseReadContract({
    abi: disasterReliefFundAbi,
    functionName: 'proposalCount',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link disasterReliefFundAbi}__ and `functionName` set to `"proposals"`
 */
export const useReadDisasterReliefFundProposals =
  /*#__PURE__*/ createUseReadContract({
    abi: disasterReliefFundAbi,
    functionName: 'proposals',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link disasterReliefFundAbi}__ and `functionName` set to `"searchProposals"`
 */
export const useReadDisasterReliefFundSearchProposals =
  /*#__PURE__*/ createUseReadContract({
    abi: disasterReliefFundAbi,
    functionName: 'searchProposals',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link disasterReliefFundAbi}__ and `functionName` set to `"titleToProposalIds"`
 */
export const useReadDisasterReliefFundTitleToProposalIds =
  /*#__PURE__*/ createUseReadContract({
    abi: disasterReliefFundAbi,
    functionName: 'titleToProposalIds',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link disasterReliefFundAbi}__ and `functionName` set to `"totalPot"`
 */
export const useReadDisasterReliefFundTotalPot =
  /*#__PURE__*/ createUseReadContract({
    abi: disasterReliefFundAbi,
    functionName: 'totalPot',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link disasterReliefFundAbi}__ and `functionName` set to `"userDonations"`
 */
export const useReadDisasterReliefFundUserDonations =
  /*#__PURE__*/ createUseReadContract({
    abi: disasterReliefFundAbi,
    functionName: 'userDonations',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link disasterReliefFundAbi}__ and `functionName` set to `"userProposals"`
 */
export const useReadDisasterReliefFundUserProposals =
  /*#__PURE__*/ createUseReadContract({
    abi: disasterReliefFundAbi,
    functionName: 'userProposals',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link disasterReliefFundAbi}__ and `functionName` set to `"userVote"`
 */
export const useReadDisasterReliefFundUserVote =
  /*#__PURE__*/ createUseReadContract({
    abi: disasterReliefFundAbi,
    functionName: 'userVote',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link disasterReliefFundAbi}__ and `functionName` set to `"userWithdrawals"`
 */
export const useReadDisasterReliefFundUserWithdrawals =
  /*#__PURE__*/ createUseReadContract({
    abi: disasterReliefFundAbi,
    functionName: 'userWithdrawals',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link disasterReliefFundAbi}__
 */
export const useWriteDisasterReliefFundundefined =
  /*#__PURE__*/ createUseWriteContract({ abi: disasterReliefFundAbi })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link disasterReliefFundAbi}__ and `functionName` set to `"allocateFromPot"`
 */
export const useWriteDisasterReliefFundAllocateFromPot =
  /*#__PURE__*/ createUseWriteContract({
    abi: disasterReliefFundAbi,
    functionName: 'allocateFromPot',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link disasterReliefFundAbi}__ and `functionName` set to `"allocateFundsToProposer"`
 */
export const useWriteDisasterReliefFundAllocateFundsToProposer =
  /*#__PURE__*/ createUseWriteContract({
    abi: disasterReliefFundAbi,
    functionName: 'allocateFundsToProposer',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link disasterReliefFundAbi}__ and `functionName` set to `"archiveProposal"`
 */
export const useWriteDisasterReliefFundArchiveProposal =
  /*#__PURE__*/ createUseWriteContract({
    abi: disasterReliefFundAbi,
    functionName: 'archiveProposal',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link disasterReliefFundAbi}__ and `functionName` set to `"authorizeGovernance"`
 */
export const useWriteDisasterReliefFundAuthorizeGovernance =
  /*#__PURE__*/ createUseWriteContract({
    abi: disasterReliefFundAbi,
    functionName: 'authorizeGovernance',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link disasterReliefFundAbi}__ and `functionName` set to `"checkExpiredProposals"`
 */
export const useWriteDisasterReliefFundCheckExpiredProposals =
  /*#__PURE__*/ createUseWriteContract({
    abi: disasterReliefFundAbi,
    functionName: 'checkExpiredProposals',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link disasterReliefFundAbi}__ and `functionName` set to `"createProposal"`
 */
export const useWriteDisasterReliefFundCreateProposal =
  /*#__PURE__*/ createUseWriteContract({
    abi: disasterReliefFundAbi,
    functionName: 'createProposal',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link disasterReliefFundAbi}__ and `functionName` set to `"donateToProposal"`
 */
export const useWriteDisasterReliefFundDonateToProposal =
  /*#__PURE__*/ createUseWriteContract({
    abi: disasterReliefFundAbi,
    functionName: 'donateToProposal',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link disasterReliefFundAbi}__ and `functionName` set to `"executeProposal"`
 */
export const useWriteDisasterReliefFundExecuteProposal =
  /*#__PURE__*/ createUseWriteContract({
    abi: disasterReliefFundAbi,
    functionName: 'executeProposal',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link disasterReliefFundAbi}__ and `functionName` set to `"recreateProposal"`
 */
export const useWriteDisasterReliefFundRecreateProposal =
  /*#__PURE__*/ createUseWriteContract({
    abi: disasterReliefFundAbi,
    functionName: 'recreateProposal',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link disasterReliefFundAbi}__ and `functionName` set to `"revokeGovernance"`
 */
export const useWriteDisasterReliefFundRevokeGovernance =
  /*#__PURE__*/ createUseWriteContract({
    abi: disasterReliefFundAbi,
    functionName: 'revokeGovernance',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link disasterReliefFundAbi}__ and `functionName` set to `"vote"`
 */
export const useWriteDisasterReliefFundVote =
  /*#__PURE__*/ createUseWriteContract({
    abi: disasterReliefFundAbi,
    functionName: 'vote',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link disasterReliefFundAbi}__
 */
export const useSimulateDisasterReliefFundundefined =
  /*#__PURE__*/ createUseSimulateContract({ abi: disasterReliefFundAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link disasterReliefFundAbi}__ and `functionName` set to `"allocateFromPot"`
 */
export const useSimulateDisasterReliefFundAllocateFromPot =
  /*#__PURE__*/ createUseSimulateContract({
    abi: disasterReliefFundAbi,
    functionName: 'allocateFromPot',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link disasterReliefFundAbi}__ and `functionName` set to `"allocateFundsToProposer"`
 */
export const useSimulateDisasterReliefFundAllocateFundsToProposer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: disasterReliefFundAbi,
    functionName: 'allocateFundsToProposer',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link disasterReliefFundAbi}__ and `functionName` set to `"archiveProposal"`
 */
export const useSimulateDisasterReliefFundArchiveProposal =
  /*#__PURE__*/ createUseSimulateContract({
    abi: disasterReliefFundAbi,
    functionName: 'archiveProposal',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link disasterReliefFundAbi}__ and `functionName` set to `"authorizeGovernance"`
 */
export const useSimulateDisasterReliefFundAuthorizeGovernance =
  /*#__PURE__*/ createUseSimulateContract({
    abi: disasterReliefFundAbi,
    functionName: 'authorizeGovernance',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link disasterReliefFundAbi}__ and `functionName` set to `"checkExpiredProposals"`
 */
export const useSimulateDisasterReliefFundCheckExpiredProposals =
  /*#__PURE__*/ createUseSimulateContract({
    abi: disasterReliefFundAbi,
    functionName: 'checkExpiredProposals',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link disasterReliefFundAbi}__ and `functionName` set to `"createProposal"`
 */
export const useSimulateDisasterReliefFundCreateProposal =
  /*#__PURE__*/ createUseSimulateContract({
    abi: disasterReliefFundAbi,
    functionName: 'createProposal',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link disasterReliefFundAbi}__ and `functionName` set to `"donateToProposal"`
 */
export const useSimulateDisasterReliefFundDonateToProposal =
  /*#__PURE__*/ createUseSimulateContract({
    abi: disasterReliefFundAbi,
    functionName: 'donateToProposal',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link disasterReliefFundAbi}__ and `functionName` set to `"executeProposal"`
 */
export const useSimulateDisasterReliefFundExecuteProposal =
  /*#__PURE__*/ createUseSimulateContract({
    abi: disasterReliefFundAbi,
    functionName: 'executeProposal',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link disasterReliefFundAbi}__ and `functionName` set to `"recreateProposal"`
 */
export const useSimulateDisasterReliefFundRecreateProposal =
  /*#__PURE__*/ createUseSimulateContract({
    abi: disasterReliefFundAbi,
    functionName: 'recreateProposal',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link disasterReliefFundAbi}__ and `functionName` set to `"revokeGovernance"`
 */
export const useSimulateDisasterReliefFundRevokeGovernance =
  /*#__PURE__*/ createUseSimulateContract({
    abi: disasterReliefFundAbi,
    functionName: 'revokeGovernance',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link disasterReliefFundAbi}__ and `functionName` set to `"vote"`
 */
export const useSimulateDisasterReliefFundVote =
  /*#__PURE__*/ createUseSimulateContract({
    abi: disasterReliefFundAbi,
    functionName: 'vote',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link disasterReliefFundAbi}__
 */
export const useWatchDisasterReliefFundundefined =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: disasterReliefFundAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link disasterReliefFundAbi}__ and `eventName` set to `"DonationReceived"`
 */
export const useWatchDisasterReliefFundDonationReceived =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: disasterReliefFundAbi,
    eventName: 'DonationReceived',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link disasterReliefFundAbi}__ and `eventName` set to `"FundsAllocated"`
 */
export const useWatchDisasterReliefFundFundsAllocated =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: disasterReliefFundAbi,
    eventName: 'FundsAllocated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link disasterReliefFundAbi}__ and `eventName` set to `"ProposalCreated"`
 */
export const useWatchDisasterReliefFundProposalCreated =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: disasterReliefFundAbi,
    eventName: 'ProposalCreated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link disasterReliefFundAbi}__ and `eventName` set to `"ProposalExecuted"`
 */
export const useWatchDisasterReliefFundProposalExecuted =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: disasterReliefFundAbi,
    eventName: 'ProposalExecuted',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link disasterReliefFundAbi}__ and `eventName` set to `"ProposalRecreated"`
 */
export const useWatchDisasterReliefFundProposalRecreated =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: disasterReliefFundAbi,
    eventName: 'ProposalRecreated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link disasterReliefFundAbi}__ and `eventName` set to `"Voted"`
 */
export const useWatchDisasterReliefFundVoted =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: disasterReliefFundAbi,
    eventName: 'Voted',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link disasterReliefFundAbi}__ and `eventName` set to `"WithdrawalMade"`
 */
export const useWatchDisasterReliefFundWithdrawalMade =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: disasterReliefFundAbi,
    eventName: 'WithdrawalMade',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__
 */
export const useReadIMulticall3undefined = /*#__PURE__*/ createUseReadContract({
  abi: iMulticall3Abi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getBasefee"`
 */
export const useReadIMulticall3GetBasefee = /*#__PURE__*/ createUseReadContract(
  { abi: iMulticall3Abi, functionName: 'getBasefee' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getBlockHash"`
 */
export const useReadIMulticall3GetBlockHash =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getBlockHash',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getBlockNumber"`
 */
export const useReadIMulticall3GetBlockNumber =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getBlockNumber',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getChainId"`
 */
export const useReadIMulticall3GetChainId = /*#__PURE__*/ createUseReadContract(
  { abi: iMulticall3Abi, functionName: 'getChainId' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getCurrentBlockCoinbase"`
 */
export const useReadIMulticall3GetCurrentBlockCoinbase =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getCurrentBlockCoinbase',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getCurrentBlockDifficulty"`
 */
export const useReadIMulticall3GetCurrentBlockDifficulty =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getCurrentBlockDifficulty',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getCurrentBlockGasLimit"`
 */
export const useReadIMulticall3GetCurrentBlockGasLimit =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getCurrentBlockGasLimit',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getCurrentBlockTimestamp"`
 */
export const useReadIMulticall3GetCurrentBlockTimestamp =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getCurrentBlockTimestamp',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getEthBalance"`
 */
export const useReadIMulticall3GetEthBalance =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getEthBalance',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getLastBlockHash"`
 */
export const useReadIMulticall3GetLastBlockHash =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getLastBlockHash',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iMulticall3Abi}__
 */
export const useWriteIMulticall3undefined =
  /*#__PURE__*/ createUseWriteContract({ abi: iMulticall3Abi })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"aggregate"`
 */
export const useWriteIMulticall3Aggregate =
  /*#__PURE__*/ createUseWriteContract({
    abi: iMulticall3Abi,
    functionName: 'aggregate',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"aggregate3"`
 */
export const useWriteIMulticall3Aggregate3 =
  /*#__PURE__*/ createUseWriteContract({
    abi: iMulticall3Abi,
    functionName: 'aggregate3',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"aggregate3Value"`
 */
export const useWriteIMulticall3Aggregate3Value =
  /*#__PURE__*/ createUseWriteContract({
    abi: iMulticall3Abi,
    functionName: 'aggregate3Value',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"blockAndAggregate"`
 */
export const useWriteIMulticall3BlockAndAggregate =
  /*#__PURE__*/ createUseWriteContract({
    abi: iMulticall3Abi,
    functionName: 'blockAndAggregate',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"tryAggregate"`
 */
export const useWriteIMulticall3TryAggregate =
  /*#__PURE__*/ createUseWriteContract({
    abi: iMulticall3Abi,
    functionName: 'tryAggregate',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"tryBlockAndAggregate"`
 */
export const useWriteIMulticall3TryBlockAndAggregate =
  /*#__PURE__*/ createUseWriteContract({
    abi: iMulticall3Abi,
    functionName: 'tryBlockAndAggregate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iMulticall3Abi}__
 */
export const useSimulateIMulticall3undefined =
  /*#__PURE__*/ createUseSimulateContract({ abi: iMulticall3Abi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"aggregate"`
 */
export const useSimulateIMulticall3Aggregate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iMulticall3Abi,
    functionName: 'aggregate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"aggregate3"`
 */
export const useSimulateIMulticall3Aggregate3 =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iMulticall3Abi,
    functionName: 'aggregate3',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"aggregate3Value"`
 */
export const useSimulateIMulticall3Aggregate3Value =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iMulticall3Abi,
    functionName: 'aggregate3Value',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"blockAndAggregate"`
 */
export const useSimulateIMulticall3BlockAndAggregate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iMulticall3Abi,
    functionName: 'blockAndAggregate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"tryAggregate"`
 */
export const useSimulateIMulticall3TryAggregate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iMulticall3Abi,
    functionName: 'tryAggregate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"tryBlockAndAggregate"`
 */
export const useSimulateIMulticall3TryBlockAndAggregate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iMulticall3Abi,
    functionName: 'tryBlockAndAggregate',
  })
