import {
  SimulationAssetTypes,
  StateChangeType,
  RecommendedActionType,
  Currency,
  SimulationMethodType,
  SimulationSuccessApiResponse,
} from '../../types/simulateApi';

export const PolygonSuccessMultiple1155OpenSea: SimulationSuccessApiResponse = {
  addressDetails: {
    address: '0x00000000000000adc04c56bf30ac9d3c0aaf14dc',
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
      amount: '2',
      assetType: SimulationAssetTypes.ERC1155,
      changeType: StateChangeType.Receive,
      coinmarketcapLink: '',
      contractAddress: '0x2953399124f0cbb46d2cbacd8a89cf0599974963',
      decimals: 0,
      etherscanLink:
        'https://etherscan.io/address/0x2953399124f0cbb46d2cbacd8a89cf0599974963',
      etherscanVerified: true,
      fiatValue: '19.27537879089481',
      logo: 'https://static.alchemyapi.io/images/assets/825.png',
      message:
        'You receive OPENSTORE#8643635851130562235653121855558625543865936930296330347388488092621593478816',
      name: 'OpenSea Collections',
      openSeaFloorPrice: 0,
      openSeaLink: '',
      openSeaVerified: false,
      symbol: 'OPENSTORE',
      tokenID:
        '8643635851130562235653121855558625543865936930296330347388488092621593478816',
      tokenName: 'Gremlin#1',
      tokenURI:
        'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/50e19d7636357fe757d58f6ad71e223b',
    },
    {
      address: '0x567',
      amount: '0.98',
      assetType: SimulationAssetTypes.Native,
      changeType: StateChangeType.Transfer,
      coinmarketcapLink: 'https://coinmarketcap.com/currencies/polygon/',
      contractAddress: '0x2953399124f0cbb46d2cbacd8a89cf0599974963',
      decimals: 18,
      etherscanLink:
        'https://etherscan.io/address/0x2953399124f0cbb46d2cbacd8a89cf0599974963',
      etherscanVerified: true,
      fiatValue: '0.6889414076956722',
      logo: 'https://static.alchemyapi.io/images/network-assets/matic.png',
      message: 'They receive 0.98 MATIC',
      name: 'MATIC',
      openSeaFloorPrice: 0,
      openSeaLink: '',
      openSeaVerified: false,
      symbol: 'MATIC',
      tokenID: '',
      tokenName: '',
      tokenURI: '',
    },
  ],
  gas: {
    gasUsedEth: '0.0000001',
    fiatValue: '0.02',
    currency: Currency.USD,
  },
  riskFactors: null,
  error: null,
};
