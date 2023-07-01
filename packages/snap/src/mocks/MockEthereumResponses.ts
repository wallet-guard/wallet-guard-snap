import {
  ApiResponse,
  ErrorType,
  ResponseType,
  Severity,
  SimulationAssetTypes,
  SimulationMethodType,
  StateChangeType,
  WarningType,
} from '../types/simulateApi';

// Example transaction from Uniswap. 0.01 ETH => 19 USDT
export const EthereumMainnetMockSuccessResponse: ApiResponse = {
  type: ResponseType.Success,
  simulation: {
    recommendedAction: WarningType.None,
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
        fiatValue: '19.27537879089481',
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
        fiatValue: '19.287887328656645',
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
    addressDetails: {
      address: '0x3fc91a3afd70395cd496c647d5a6cc9d4b2b7fad',
      addressType: 'CONTRACT',
      etherscanVerified: true,
      etherscanLink:
        'https://etherscan.io/address/0x3fc91a3afd70395cd496c647d5a6cc9d4b2b7fad',
    },
    error: null,
  },
  error: undefined,
};

export const EthereumMainnetMockResponseWithWarnings: ApiResponse = {
  type: ResponseType.Success,
  simulation: {
    recommendedAction: WarningType.Block,
    overviewMessage: 'We suspect that this website is a wallet drainer.',
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
        fiatValue: '200',
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
        type: 'DRAINER',
        message: 'Domain identified as a wallet drainer.',
        value: '',
      },
      {
        severity: Severity.High,
        type: 'RECENTLY_CREATED',
        message: 'This domain was recently created',
        value: '',
      },
    ],
    addressDetails: {
      address: '',
      addressType: '',
      etherscanVerified: false,
      etherscanLink: '',
    },
    error: null,
  },
  error: undefined,
};

export const EthereumMainnetMockRevertTransaction: ApiResponse = {
  type: ResponseType.Revert,
  simulation: undefined,
  error: {
    type: ErrorType.Revert,
    message: 'This transaction will revert',
    extraData: null,
  },
};

export const EthereumMainnetMockErrorResponse: ApiResponse = {
  type: ResponseType.Errored,
  simulation: undefined,
  error: {
    type: ErrorType.GeneralError,
    message: '',
    extraData: null,
  },
};
