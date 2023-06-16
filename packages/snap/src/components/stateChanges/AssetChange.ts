import { heading, text } from '@metamask/snaps-ui';
import { StateChange, StateChangeType } from '../../types/simulateApi';

// processStateChange is a helper function to process a single state change. TransferComponent and ReceiveComponent are aliases for processStateChange.
const processStateChange = (stateChange: StateChange) => {
  const fiatValue = Number(stateChange.fiatValue).toFixed(2);

  switch (stateChange.assetType) {
    case 'NATIVE':
    case 'ERC1155':
    case 'ERC20':
      return text(
        `${stateChange.amount} ${stateChange.symbol} ($${fiatValue})`,
      );
    case 'ERC721':
      return text(`${stateChange.tokenName} ($${fiatValue})`);
    default:
      return text('');
    // todo
  }
};

export const AssetChange = (
  type: StateChangeType,
  stateChanges: StateChange[],
) => {
  const headerText =
    type === StateChangeType.Receive ? 'You will receive:' : 'You will send:';

  const output: any[] = [heading(headerText)]; // todo: create a type for UI components

  stateChanges.forEach((stateChange) => {
    const stateChangeComponent = processStateChange(stateChange);
    output.push(stateChangeComponent);
  });

  return output;
};
