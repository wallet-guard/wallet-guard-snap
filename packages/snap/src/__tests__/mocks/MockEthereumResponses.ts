/* eslint-disable prettier/prettier */
import {
  ErrorType,
  Severity,
  SimulationAssetTypes,
  SimulationMethodType,
  StateChangeType,
  RecommendedActionType,
  WarningType,
  Currency,
  SimulationSuccessApiResponse,
} from '../../types/simulateApi';

// Example transaction from Uniswap. 0.01 ETH => 19 USDT
export const EthereumMainnetMockSuccessResponse: SimulationSuccessApiResponse = {
  recommendedAction: RecommendedActionType.None,
  overviewMessage: '',
  method: SimulationMethodType.EthSendTransaction,
  stateChanges: [
    {
      address: '0x123',
      amount: '19.276096',
      assetType: SimulationAssetTypes.ERC20,
      changeType: StateChangeType.Receive,
      coinmarketcapLink: 'https://coinmarketcap.com/currencies/tether/',
      contractAddress: '0xdac17f958d2ee523a2206206994597c13d831ec7',
      decimals: 6,
      etherscanLink:
        'https://etherscan.io/address/0xdac17f958d2ee523a2206206994597c13d831ec7',
      etherscanVerified: true,
      fiatValue: '19.28',
      logo: 'https://static.alchemyapi.io/images/assets/825.png',
      message: 'You receive 19.276096 USDT',
      name: 'Tether',
      openSeaFloorPrice: 0,
      openSeaLink: '',
      openSeaVerified: false,
      symbol: 'USDT',
      tokenID: '',
      tokenName: '',
      tokenURI: '',
    },
    {
      address: '0x3fc91a3afd70395cd496c647d5a6cc9d4b2b7fad',
      amount: '0.01',
      assetType: SimulationAssetTypes.Native,
      changeType: StateChangeType.Transfer,
      coinmarketcapLink: 'https://coinmarketcap.com/currencies/ethereum/',
      contractAddress: '',
      decimals: 18,
      etherscanLink: '',
      etherscanVerified: true,
      fiatValue: '19.29',
      logo: 'https://static.alchemyapi.io/images/network-assets/eth.png',
      message: 'They receive 0.01 ETH',
      name: 'Ethereum',
      openSeaFloorPrice: 0,
      openSeaLink: '',
      openSeaVerified: false,
      symbol: 'ETH',
      tokenID: '',
      tokenName: '',
      tokenURI: '',
    },
  ],
  riskFactors: [],
  gas: {
    gasUsedEth: '',
    fiatValue: '13.26',
    currency: Currency.USD,
  },
  addressDetails: {
    address: '0x3fc91a3afd70395cd496c647d5a6cc9d4b2b7fad',
    addressType: 'CONTRACT',
    etherscanVerified: true,
    etherscanLink:
      'https://etherscan.io/address/0x3fc91a3afd70395cd496c647d5a6cc9d4b2b7fad',
  },
  error: null,
};

export const EthereumMainnetMockResponseShouldBlock: SimulationSuccessApiResponse = {
  recommendedAction: RecommendedActionType.Block,
  overviewMessage: 'This website is suspected to be a wallet drainer.',
  method: SimulationMethodType.EthSendTransaction,
  stateChanges: [
    {
      address: '0x12345',
      amount: '0.1',
      assetType: SimulationAssetTypes.Native,
      changeType: StateChangeType.Transfer,
      coinmarketcapLink: 'https://coinmarketcap.com/currencies/ethereum/',
      contractAddress: '',
      decimals: 18,
      etherscanLink: '',
      etherscanVerified: true,
      fiatValue: '200.19',
      logo: 'https://static.alchemyapi.io/images/network-assets/eth.png',
      message: 'They receive 0.1 ETH',
      name: 'Ethereum',
      openSeaFloorPrice: 0,
      openSeaLink: '',
      openSeaVerified: false,
      symbol: 'ETH',
      tokenID: '',
      tokenName: '',
      tokenURI: '',
    },
  ],
  riskFactors: [
    {
      severity: Severity.Critical,
      type: WarningType.Drainer,
      message: 'Domain identified as a wallet drainer.',
      value: '',
    },
    {
      severity: Severity.High,
      type: WarningType.RecentlyCreated,
      message: 'This domain was recently created',
      value: '',
    },
  ],
  gas: {
    gasUsedEth: '',
    fiatValue: '13.69',
    currency: Currency.USD,
  },
  addressDetails: {
    address: '',
    addressType: '',
    etherscanVerified: false,
    etherscanLink: '',
  },
  error: null,
};

export const EthereumMainnetMockResponseWithWarnings: SimulationSuccessApiResponse = {
  recommendedAction: RecommendedActionType.Warn,
  overviewMessage: 'We detected 1 high risk indicator on this transaction.',
  method: SimulationMethodType.EthSendTransaction,
  stateChanges: [
    {
      address: '0x12345',
      amount: '0.1',
      assetType: SimulationAssetTypes.Native,
      changeType: StateChangeType.Transfer,
      coinmarketcapLink: 'https://coinmarketcap.com/currencies/ethereum/',
      contractAddress: '',
      decimals: 18,
      etherscanLink: '',
      etherscanVerified: true,
      fiatValue: '200.55',
      logo: 'https://static.alchemyapi.io/images/network-assets/eth.png',
      message: 'They receive 0.1 ETH',
      name: 'Ethereum',
      openSeaFloorPrice: 0,
      openSeaLink: '',
      openSeaVerified: false,
      symbol: 'ETH',
      tokenID: '',
      tokenName: '',
      tokenURI: '',
    },
  ],
  riskFactors: [
    {
      severity: Severity.High,
      type: WarningType.RecentlyCreated,
      message: 'This domain was recently created',
      value: '',
    },
  ],
  gas: {
    gasUsedEth: '',
    fiatValue: '13.98',
    currency: Currency.USD,
  },
  addressDetails: {
    address: '',
    addressType: '',
    etherscanVerified: false,
    etherscanLink: '',
  },
  error: null,
};

export const EthereumMainnetMockRevertTransaction: SimulationSuccessApiResponse = {
  stateChanges: null,
  recommendedAction: RecommendedActionType.None,
  overviewMessage: '',
  method: SimulationMethodType.EthSendTransaction,
  riskFactors: [],
  gas: {
    gasUsedEth: '',
    fiatValue: '10.97',
    currency: Currency.USD,
  },
  addressDetails: {
    address: '0x123456789',
    addressType: 'CONTRACT',
    etherscanVerified: false,
    etherscanLink: '',
  },
  error: {
    type: ErrorType.Revert,
    message: 'Execution reverted',
    extraData: null,
  },
};

export const EthereumMainnetMockInsufficientFunds: SimulationSuccessApiResponse = {
  stateChanges: null,
  recommendedAction: RecommendedActionType.None,
  overviewMessage: '',
  method: SimulationMethodType.EthSendTransaction,
  riskFactors: [],
  gas: {
    gasUsedEth: '',
    fiatValue: '10.97',
    currency: Currency.USD,
  },
  addressDetails: {
    address: '0x123456789',
    addressType: 'CONTRACT',
    etherscanVerified: false,
    etherscanLink: '',
  },
  error: {
    type: ErrorType.InsufficientFunds,
    message: 'insufficient funds for this transaction',
    extraData: null,
  },
};

export const EthereumMainnetMockErrorResponse: SimulationSuccessApiResponse = {
  stateChanges: null,
  recommendedAction: RecommendedActionType.None,
  overviewMessage: '',
  method: SimulationMethodType.EthSendTransaction,
  riskFactors: [],
  gas: {
    gasUsedEth: '',
    fiatValue: '',
    currency: Currency.USD,
  },
  addressDetails: {
    address: '',
    addressType: '',
    etherscanVerified: false,
    etherscanLink: '',
  },
  error: {
    type: ErrorType.GeneralError,
    message: '',
    extraData: null,
  },
};
