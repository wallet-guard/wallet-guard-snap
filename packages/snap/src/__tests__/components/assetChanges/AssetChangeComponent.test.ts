import { heading, panel, text } from '@metamask/snaps-ui';
import {
  SimulationAssetTypes,
  StateChange,
  StateChangeType,
} from '../../../types/simulateApi';
import { AssetChangeComponent } from '../../../components/assetChanges/AssetChangeComponent';

describe('AssetChangeComponent', () => {
  it('should correctly generate panel for ERC20 token transfer', () => {
    const stateChanges: StateChange[] = [
      {
        assetType: SimulationAssetTypes.ERC20,
        changeType: StateChangeType.Transfer,
        address: '0x123',
        amount: '1',
        symbol: 'ETH',
        decimals: 18,
        contractAddress: '0xabc',
        name: 'Ether',
        logo: 'https://example.com/logo.png',
        tokenID: '',
        tokenURI: '',
        tokenName: '',
        openSeaFloorPrice: 0,
        openSeaVerified: false,
        openSeaLink: '',
        etherscanVerified: true,
        etherscanLink: 'https://etherscan.io',
        coinmarketcapLink: 'https://coinmarketcap.com',
        message: 'Transfer 1 ETH',
        fiatValue: '2000',
      },
    ];
    const expected = panel([
      heading('➡️ You are sending:'),
      text('1 ETH ($2,000)'),
    ]);
    const actual = AssetChangeComponent(StateChangeType.Transfer, stateChanges);
    expect(actual).toStrictEqual(expected);
  });

  it('should correctly generate panel for ERC20 token recieve', () => {
    const stateChanges: StateChange[] = [
      {
        assetType: SimulationAssetTypes.ERC20,
        changeType: StateChangeType.Receive,
        address: '0x123',
        amount: '1',
        symbol: 'ETH',
        decimals: 18,
        contractAddress: '0xabc',
        name: 'Ether',
        logo: 'https://example.com/logo.png',
        tokenID: '',
        tokenURI: '',
        tokenName: '',
        openSeaFloorPrice: 0,
        openSeaVerified: false,
        openSeaLink: '',
        etherscanVerified: true,
        etherscanLink: 'https://etherscan.io',
        coinmarketcapLink: 'https://coinmarketcap.com',
        message: 'Recieve 1 ETH',
        fiatValue: '2000.40',
      },
    ];
    const expected = panel([
      heading('⬅️ You are receiving:'),
      text('1 ETH ($2,000.40)'),
    ]);
    const actual = AssetChangeComponent(StateChangeType.Receive, stateChanges);
    expect(actual).toStrictEqual(expected);
  });

  it('should correctly generate panel for ERC721 token receive', () => {
    const stateChanges: StateChange[] = [
      {
        assetType: SimulationAssetTypes.ERC721,
        changeType: StateChangeType.Receive,
        address: '0x123',
        amount: '',
        symbol: '',
        decimals: 0,
        contractAddress: '0xabc',
        name: '',
        logo: 'https://example.com/logo.png',
        tokenID: '123',
        tokenURI: '',
        tokenName: 'CryptoKitty',
        openSeaFloorPrice: 0,
        openSeaVerified: false,
        openSeaLink: '',
        etherscanVerified: true,
        etherscanLink: 'https://etherscan.io',
        coinmarketcapLink: 'https://coinmarketcap.com',
        message: 'Receive CryptoKitty',
        fiatValue: '1000',
      },
    ];
    const expected = panel([
      heading('⬅️ You are receiving:'),
      text('CryptoKitty ($1,000)'),
    ]);
    const actual = AssetChangeComponent(StateChangeType.Receive, stateChanges);
    expect(actual).toStrictEqual(expected);
  });

  it('should correctly generate panel for ERC721 token receive with fiat value set to 0', () => {
    const stateChanges: StateChange[] = [
      {
        assetType: SimulationAssetTypes.ERC721,
        changeType: StateChangeType.Receive,
        address: '0x123',
        amount: '',
        symbol: '',
        decimals: 0,
        contractAddress: '0xabc',
        name: '',
        logo: 'https://example.com/logo.png',
        tokenID: '123',
        tokenURI: '',
        tokenName: 'CryptoKitty',
        openSeaFloorPrice: 0,
        openSeaVerified: false,
        openSeaLink: '',
        etherscanVerified: true,
        etherscanLink: 'https://etherscan.io',
        coinmarketcapLink: 'https://coinmarketcap.com',
        message: 'Receive CryptoKitty',
        fiatValue: '',
      },
    ];
    const expected = panel([
      heading('⬅️ You are receiving:'),
      text('CryptoKitty'),
    ]);
    const actual = AssetChangeComponent(StateChangeType.Receive, stateChanges);
    expect(actual).toStrictEqual(expected);
  });

  it('should correctly generate panel for ERC1155 token transfer', () => {
    const stateChanges: StateChange[] = [
      {
        assetType: SimulationAssetTypes.ERC1155,
        changeType: StateChangeType.Transfer,
        address: '0x123',
        amount: '2',
        symbol: '',
        decimals: 0,
        contractAddress: '0xabc',
        name: '',
        logo: 'https://example.com/logo.png',
        tokenID: '456',
        tokenURI: '',
        tokenName: 'CryptoPunk',
        openSeaFloorPrice: 0,
        openSeaVerified: false,
        openSeaLink: '',
        etherscanVerified: true,
        etherscanLink: 'https://etherscan.io',
        coinmarketcapLink: 'https://coinmarketcap.com',
        message: 'Transfer 2 CryptoPunk',
        fiatValue: '3000.328',
      },
    ];
    const expected = panel([
      heading('➡️ You are sending:'),
      text('2 CryptoPunk ($3,000.33)'),
    ]);
    const actual = AssetChangeComponent(StateChangeType.Transfer, stateChanges);
    expect(actual).toStrictEqual(expected);
  });

  it('should correctly generate panel for Native asset receive', () => {
    const stateChanges: StateChange[] = [
      {
        assetType: SimulationAssetTypes.Native,
        changeType: StateChangeType.Receive,
        address: '0x123',
        amount: '0.5',
        symbol: 'ETH',
        decimals: 18,
        contractAddress: '',
        name: 'Ether',
        logo: 'https://example.com/logo.png',
        tokenID: '',
        tokenURI: '',
        tokenName: '',
        openSeaFloorPrice: 0,
        openSeaVerified: false,
        openSeaLink: '',
        etherscanVerified: true,
        etherscanLink: 'https://etherscan.io',
        coinmarketcapLink: 'https://coinmarketcap.com',
        message: 'Receive 0.5 ETH',
        fiatValue: '1000.49',
      },
    ];
    const expected = panel([
      heading('⬅️ You are receiving:'),
      text('0.5 ETH ($1,000.49)'),
    ]);
    const actual = AssetChangeComponent(StateChangeType.Receive, stateChanges);
    expect(actual).toStrictEqual(expected);
  });

  it('should correctly generate panel for increaseAllowance()', () => {
    const stateChanges: StateChange[] = [
      {
        assetType: SimulationAssetTypes.ERC20,
        changeType: StateChangeType.Approve,
        address: '0x123',
        amount: '100',
        symbol: 'ENS',
        decimals: 18,
        contractAddress: '0xc18360217d8f7ab5e7c516566761ea12ce7f9d72',
        name: 'Ethereum Name Service',
        logo: 'https://example.com/logo.png',
        tokenID: '',
        tokenURI: '',
        tokenName: '',
        openSeaFloorPrice: 0,
        openSeaVerified: false,
        openSeaLink: '',
        etherscanVerified: true,
        etherscanLink: 'https://etherscan.io',
        coinmarketcapLink: 'https://coinmarketcap.com',
        message: 'They can withdraw 100 ENS',
        fiatValue: '',
      },
    ];

    const expected = panel([
      heading('➡️ You are giving approval:'),
      text('100 ENS'),
    ]);
    const actual = AssetChangeComponent(StateChangeType.Approve, stateChanges);
    expect(actual).toStrictEqual(expected);
  });

  it('should correctly generate panel for revoking', () => {
    const stateChanges: StateChange[] = [
      {
        assetType: SimulationAssetTypes.ERC20,
        changeType: StateChangeType.RevokeApprovalForAll,
        address: '0x123',
        amount: '0',
        symbol: 'WETH',
        decimals: 18,
        contractAddress: '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619',
        name: 'WETH',
        logo: 'https://static.alchemyapi.io/images/assets/2396.png',
        tokenID: '',
        tokenURI: '',
        tokenName: '',
        openSeaFloorPrice: 0,
        openSeaVerified: false,
        openSeaLink: '',
        etherscanVerified: true,
        etherscanLink:
          'https://etherscan.io/address/0x7ceb23fd6bc0add59e62ac25578270cff1b9f619',
        coinmarketcapLink: '',
        message: '',
        fiatValue: '',
      },
      {
        assetType: SimulationAssetTypes.ERC20,
        changeType: StateChangeType.Transfer,
        address: '0x456',
        amount: '0.01',
        symbol: 'WETH',
        decimals: 18,
        contractAddress: '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619',
        name: 'WETH',
        logo: 'https://static.alchemyapi.io/images/assets/2396.png',
        tokenID: '',
        tokenURI: '',
        tokenName: '',
        openSeaFloorPrice: 0,
        openSeaVerified: false,
        openSeaLink: '',
        etherscanVerified: true,
        etherscanLink:
          'https://etherscan.io/address/0x7ceb23fd6bc0add59e62ac25578270cff1b9f619',
        coinmarketcapLink: '',
        message: '',
        fiatValue: '',
      },
    ];

    const expected = panel([
      heading('➡️ You are sending:'),
      text('0.01 WETH'),
      heading('⬅️ You are revoking:'),
      text('WETH'),
    ]);
    const actual = AssetChangeComponent(StateChangeType.Approve, stateChanges);
    expect(actual).toStrictEqual(expected);
  });

  it('should handle empty stateChanges array correctly', () => {
    const stateChanges: StateChange[] = [];
    const expected = panel([heading('➡️ You are sending:')]);
    const actual = AssetChangeComponent(StateChangeType.Transfer, stateChanges);
    expect(actual).toStrictEqual(expected);
  });
});
