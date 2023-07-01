import {
  ApiResponse,
  ErrorType,
  ResponseType,
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

export const EthereumMainnetMockErrorResponse: ApiResponse = {
  type: ResponseType.Errored,
  simulation: undefined,
  error: {
    type: ErrorType.GeneralError,
    message: '',
    extraData: null,
  },
};
