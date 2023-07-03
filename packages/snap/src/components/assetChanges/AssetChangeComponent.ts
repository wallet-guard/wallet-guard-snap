import {
  Component,
  Heading,
  Panel,
  Text,
  heading,
  panel,
  text,
} from '@metamask/snaps-ui';
import {
  SimulationAssetTypes,
  StateChange,
  StateChangeType,
} from '../../types/simulateApi';

// getAssetChangeText is a helper function to process a single state change. TransferComponent and ReceiveComponent are aliases for processStateChange.
const getAssetChangeText = (stateChange: StateChange): Text => {
  const tokenName = stateChange.tokenName
    ? stateChange.tokenName
    : `${stateChange.symbol} #${stateChange.tokenID}`;

  const fiatValue = stateChange.fiatValue
    ? ` ($${Number(stateChange.fiatValue).toFixed(2)})`
    : '';

  switch (stateChange.assetType) {
    case SimulationAssetTypes.Native:
    case SimulationAssetTypes.ERC20:
      return text(
        `**${stateChange.amount} ${stateChange.symbol}**${fiatValue}`,
      );
    case SimulationAssetTypes.ERC721:
      return text(`**${tokenName}** ($${fiatValue})`);
    case SimulationAssetTypes.ERC1155:
      return text(`**${stateChange.amount} ${tokenName}**${fiatValue}`);
    default:
      return text(`**${stateChange.amount} ${tokenName}**${fiatValue}`);
  }
};

const getHeader = (changeType: StateChangeType): Heading => {
  // add more ChangeType mappings here as they are supported
  switch (changeType) {
    case StateChangeType.Receive:
      return heading('You are receiving:');
    case StateChangeType.Transfer:
      return heading('You are sending:');
    default:
      return heading('');
  }
};

export const AssetChangeComponent = (
  type: StateChangeType,
  stateChanges: StateChange[],
): Panel => {
  const header = getHeader(type);
  const output: Component[] = [header];

  stateChanges.forEach((stateChange) => {
    const stateChangeText = getAssetChangeText(stateChange);
    output.push(stateChangeText);
  });

  return panel(output);
};
