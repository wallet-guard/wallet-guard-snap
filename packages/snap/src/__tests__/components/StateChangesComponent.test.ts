import { divider, panel } from '@metamask/snaps-ui';
import {
  Currency,
  SimulatedGas,
  SimulationAssetTypes,
  StateChange,
  StateChangeType,
} from '../../types/simulateApi';
import { StateChangesComponent } from '../../components/StateChangesComponent';

import {
  NoStateChangesComponent,
  AssetChangeComponent,
} from '../../components';

describe('StateChangesComponent', () => {
  it('should return NoStateChangesComponent when stateChanges is null and no gas is provided', () => {
    const expected = NoStateChangesComponent();
    const actual = StateChangesComponent(null);
    expect(actual).toStrictEqual(expected);
  });

  it('should return NoStateChangesComponent when stateChanges is empty and no gas is provided', () => {
    const expected = NoStateChangesComponent();
    const actual = StateChangesComponent([]);
    expect(actual).toStrictEqual(expected);
  });

  it('should handle null stateChanges array correctly when gas estimate exists', () => {
    const stateChanges: StateChange[] | null = null;
    const gas: SimulatedGas = {
      currency: Currency.USD,
      fiatValue: '2.50',
      gasUsedEth: '0.000000000000000001',
    };
    const expected = AssetChangeComponent(StateChangeType.Transfer, [], gas);

    const actual = StateChangesComponent(stateChanges, gas);
    expect(actual).toStrictEqual(expected);
  });

  it('should handle empty stateChanges array correctly when gas estimate exists', () => {
    const stateChanges: StateChange[] | null = [];
    const gas: SimulatedGas = {
      currency: Currency.USD,
      fiatValue: '2.50',
      gasUsedEth: '0.000000000000000001',
    };
    const expected = AssetChangeComponent(StateChangeType.Transfer, [], gas);

    const actual = StateChangesComponent(stateChanges, gas);
    expect(actual).toStrictEqual(expected);
  });

  it('should correctly handle Transfer and Receive stateChanges', () => {
    const stateChanges: StateChange[] = [
      {
        changeType: StateChangeType.Transfer,
        assetType: SimulationAssetTypes.ERC20,
        address: '0x123',
        amount: '50',
        symbol: 'SYMB',
        decimals: 18,
        contractAddress: '0x123',
        name: 'TokenName',
        logo: 'http://logo.url',
        tokenID: '1',
        tokenURI: 'http://token.uri',
        tokenName: 'TokenName',
        openSeaFloorPrice: 0.1,
        openSeaVerified: true,
        openSeaLink: 'http://opensea.link',
        etherscanVerified: true,
        etherscanLink: 'http://etherscan.link',
        coinmarketcapLink: 'http://coinmarketcap.link',
        message: 'Transfer message',
        fiatValue: '100.00',
      },
      {
        changeType: StateChangeType.Receive,
        assetType: SimulationAssetTypes.ERC721,
        address: '0x456',
        amount: '25',
        symbol: 'RSYMB',
        decimals: 18,
        contractAddress: '0x456',
        name: 'ReceiveTokenName',
        logo: 'http://logo2.url',
        tokenID: '2',
        tokenURI: 'http://token2.uri',
        tokenName: 'TokenName2',
        openSeaFloorPrice: 0.2,
        openSeaVerified: false,
        openSeaLink: 'http://opensea2.link',
        etherscanVerified: false,
        etherscanLink: 'http://etherscan2.link',
        coinmarketcapLink: 'http://coinmarketcap2.link',
        message: 'Receive message',
        fiatValue: '200',
      },
    ];
    const gas: SimulatedGas = {
      currency: Currency.USD,
      fiatValue: '2.50',
      gasUsedEth: '0.000000000000000001',
    };
    const transferChanges = stateChanges.filter(
      (stateChange) => stateChange.changeType === StateChangeType.Transfer,
    );
    const receiveChanges = stateChanges.filter(
      (stateChange) => stateChange.changeType === StateChangeType.Receive,
    );
    const expected = panel([
      // Asserts that Transfer comes before Receive
      AssetChangeComponent(StateChangeType.Transfer, transferChanges, gas),
      divider(),
      AssetChangeComponent(StateChangeType.Receive, receiveChanges),
    ]);
    const actual = StateChangesComponent(stateChanges, gas);
    expect(actual).toStrictEqual(expected);
  });

  it('should correctly handle Transfer stateChanges only', () => {
    const stateChanges: StateChange[] = [
      {
        changeType: StateChangeType.Transfer,
        assetType: SimulationAssetTypes.ERC20,
        address: '0x123',
        amount: '50',
        symbol: 'SYMB',
        decimals: 18,
        contractAddress: '0x123',
        name: 'TokenName',
        logo: 'http://logo.url',
        tokenID: '1',
        tokenURI: 'http://token.uri',
        tokenName: 'TokenName',
        openSeaFloorPrice: 0.1,
        openSeaVerified: true,
        openSeaLink: 'http://opensea.link',
        etherscanVerified: true,
        etherscanLink: 'http://etherscan.link',
        coinmarketcapLink: 'http://coinmarketcap.link',
        message: 'Transfer message',
        fiatValue: '100.00',
      },
    ];
    const gas: SimulatedGas = {
      currency: Currency.USD,
      fiatValue: '2.500001',
      gasUsedEth: '0.000000000000000001',
    };
    const transferChanges = stateChanges.filter(
      (stateChange) => stateChange.changeType === StateChangeType.Transfer,
    );
    const expected = panel([
      AssetChangeComponent(StateChangeType.Transfer, transferChanges, gas),
    ]);
    const actual = StateChangesComponent(stateChanges, gas);
    expect(actual).toStrictEqual(expected);
  });

  it('should correctly handle Receive stateChanges only', () => {
    const stateChanges: StateChange[] = [
      {
        changeType: StateChangeType.Receive,
        assetType: SimulationAssetTypes.ERC721,
        address: '0x456',
        amount: '25',
        symbol: 'RSYMB',
        decimals: 18,
        contractAddress: '0x456',
        name: 'ReceiveTokenName',
        logo: 'http://logo2.url',
        tokenID: '2',
        tokenURI: 'http://token2.uri',
        tokenName: 'TokenName2',
        openSeaFloorPrice: 0.2,
        openSeaVerified: false,
        openSeaLink: 'http://opensea2.link',
        etherscanVerified: false,
        etherscanLink: 'http://etherscan2.link',
        coinmarketcapLink: 'http://coinmarketcap2.link',
        message: 'Receive message',
        fiatValue: '200',
      },
    ];
    const gas: SimulatedGas = {
      currency: Currency.USD,
      fiatValue: '2.50',
      gasUsedEth: '0.000000000000000001',
    };
    const receiveChanges = stateChanges.filter(
      (stateChange) => stateChange.changeType === StateChangeType.Receive,
    );
    const expected = panel([
      AssetChangeComponent(StateChangeType.Transfer, [], gas),
      divider(),
      AssetChangeComponent(StateChangeType.Receive, receiveChanges),
    ]);
    const actual = StateChangesComponent(stateChanges, gas);
    expect(actual).toStrictEqual(expected);
  });

  it('should correctly handle Revoke stateChanges only', () => {
    const stateChanges: StateChange[] = [
      {
        changeType: StateChangeType.Revoke,
        assetType: SimulationAssetTypes.ERC721,
        address: '0x456',
        amount: '25',
        symbol: 'RSYMB',
        decimals: 18,
        contractAddress: '0x456',
        name: 'ReceiveTokenName',
        logo: 'http://logo2.url',
        tokenID: '2',
        tokenURI: 'http://token2.uri',
        tokenName: 'TokenName2',
        openSeaFloorPrice: 0.2,
        openSeaVerified: false,
        openSeaLink: 'http://opensea2.link',
        etherscanVerified: false,
        etherscanLink: 'http://etherscan2.link',
        coinmarketcapLink: 'http://coinmarketcap2.link',
        message: 'revoke message',
        fiatValue: '200',
      },
    ];
    const gas: SimulatedGas = {
      currency: Currency.USD,
      fiatValue: '2.50',
      gasUsedEth: '0.000000000000000001',
    };
    const revokeChanges = stateChanges.filter(
      (stateChange) =>
        stateChange.changeType === StateChangeType.Revoke ||
        stateChange.changeType === StateChangeType.RevokeApprovalForAll,
    );
    const expected = panel([
      AssetChangeComponent(StateChangeType.Revoke, [], gas),
      divider(),
    ]);
    const actual = StateChangesComponent(revokeChanges, gas);
    expect(actual).toStrictEqual(expected);
  });
});
