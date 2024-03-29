import {
  Currency,
  RecommendedActionType,
  SimulationAssetTypes,
  SimulationMethodType,
  SimulationSuccessApiResponse,
  StateChangeType,
} from '../../types/simulateApi';

export const ArbitrumSuccessTokenSwap: SimulationSuccessApiResponse = {
  addressDetails: {
    address: '0x3fc91a3afd70395cd496c647d5a6cc9d4b2b7fad',
    addressType: 'CONTRACT',
    etherscanLink:
      'https://etherscan.io/address/0x00000000000000adc04c56bf30ac9d3c0aaf14dc',
    etherscanVerified: true,
  },
  method: SimulationMethodType.EthSendTransaction,
  overviewMessage: '',
  recommendedAction: RecommendedActionType.None,
  stateChanges: [
    {
      address: '0x123',
      amount: '0.015894958776922639',
      assetType: SimulationAssetTypes.Native,
      changeType: StateChangeType.Transfer,
      coinmarketcapLink: 'https://coinmarketcap.com/currencies/ethereum/',
      contractAddress: '',
      decimals: 18,
      etherscanLink: '',
      etherscanVerified: true,
      fiatValue: '31.25',
      logo: 'https://static.alchemyapi.io/images/network-assets/eth.png',
      message: 'They receive 0.015894958776922639 ETH',
      name: 'Ethereum',
      openSeaFloorPrice: 0,
      openSeaLink: '',
      openSeaVerified: false,
      symbol: '',
      tokenID: '',
      tokenName: '',
      tokenURI: '',
    },
    {
      address: '0x567',
      amount: '26.644880719194217218',
      assetType: SimulationAssetTypes.ERC20,
      changeType: StateChangeType.Receive,
      coinmarketcapLink: '',
      contractAddress: '0x912ce59144191c1204e64559fe8253a0e49e6548',
      decimals: 18,
      etherscanLink:
        'https://etherscan.io/address/0x912ce59144191c1204e64559fe8253a0e49e6548',
      etherscanVerified: true,
      fiatValue: '0.69',
      logo: 'https://static.alchemyapi.io/images/assets/11841.png',
      message: 'You receive 26.644880719194217218 ARB',
      name: 'Arbitrum',
      openSeaFloorPrice: 0,
      openSeaLink: '',
      openSeaVerified: false,
      symbol: 'ARB',
      tokenID: '',
      tokenName: '',
      tokenURI: '',
    },
  ],
  gas: {
    gasUsedEth: '0.00019354',
    fiatValue: '0.38',
    currency: Currency.USD,
  },
  riskFactors: null,
  error: null,
};
