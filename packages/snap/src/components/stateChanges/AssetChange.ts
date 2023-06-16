/* eslint-disable default-case */
import {
  Component,
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

// processStateChange is a helper function to process a single state change. TransferComponent and ReceiveComponent are aliases for processStateChange.
const processStateChange = (stateChange: StateChange): Text => {
  const fiatValue = Number(stateChange.fiatValue).toFixed(2);

  switch (stateChange.assetType) {
    case SimulationAssetTypes.Native:
    case SimulationAssetTypes.ERC1155:
    case SimulationAssetTypes.ERC20:
      return text(
        `${stateChange.amount} ${stateChange.symbol} ($${fiatValue})`,
      );
    case SimulationAssetTypes.ERC721:
      return text(`${stateChange.tokenName} ($${fiatValue})`);
    default:
      return text('');
    // todo
  }
};

// eslint-disable-next-line consistent-return
const getHeaderText = (changeType: StateChangeType): string => {
  // add more ChangeType mappings here as they are supported
  switch (changeType) {
    case StateChangeType.Receive:
      return 'You will receive:';
    case StateChangeType.Transfer:
      return 'You will send:';
  }
};

export const AssetChange = (
  type: StateChangeType,
  stateChanges: StateChange[],
): Panel => {
  const headerText = getHeaderText(type);

  const output: Component[] = [heading(headerText)]; // todo: create a type for UI components

  stateChanges.forEach((stateChange) => {
    const stateChangeComponent = processStateChange(stateChange);
    output.push(stateChangeComponent);
  });

  return panel(output);
};
