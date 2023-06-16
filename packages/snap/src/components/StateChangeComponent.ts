import { divider, text } from '@metamask/snaps-ui';
import { StateChange, StateChangeType } from '../types/simulateApi';
import { NewComponentArray } from './ComponentArray';

/**
 * Creates a MetaMask Snap component based on a state change.
 *
 * @param stateChanges - The state changes from the Wallet Guard API.
 * @returns A MetaMask Snap component based on the results of the API call.
 */
export const StateChangeComponent = (stateChanges: StateChange[] | null) => {
  if (stateChanges === null) {
    return NewComponentArray('No state changes');
  }

  const receiveComponents = NewComponentArray('You will receive:');
  const transferComponents = NewComponentArray('You will send:');
  const approveComponents = NewComponentArray('You will be approving:');
  const revokeApproveComponents = NewComponentArray(
    'You will be revoking approval for:',
  );

  // const transfer = stateChanges.filter((stateChange) => stateChange.changeType === StateChangeType.Transfer);

  // Idea for new flow here:
  // currently we create components for all these, append to them, then map them to the response
  // the new flow should be to filter out all types, then return the ones that exist. we only support receive and transfer on launch. so these mapper functions can be significantly reduced
  // match this entire file with the way the extension maps state changes in StateChangesComponent.tsx

  // consider refactoring ComponentArray.ts too. that file is very confusing


  // Sort state changes into the receive, transfer, approve, and revoke approve arrays.
  stateChanges.forEach((stateChange: StateChange) => {
    switch (stateChange.changeType) {
      case StateChangeType.RevokeApprovalForAll:
        revokeApproveComponents.push(text(stateChange.message));
        break;
      case StateChangeType.ApprovalForAll:
        approveComponents.push(text(stateChange.message));
        break;
      case StateChangeType.Approve:
        approveComponents.push(text(stateChange.message));
        break;
      case StateChangeType.RevokeApprove:
        revokeApproveComponents.push(text(stateChange.message));
        break;
      case StateChangeType.Transfer:
        const component = TransferComponent(stateChange);
        if (component) {
          transferComponents.push(component);
        }
        break;
      case StateChangeType.Receive:
        const receiveComponent = ReceiveComponent(stateChange);
        if (receiveComponent) {
          receiveComponents.push(receiveComponent);
        }
        break;
      default:
        throw new Error('unknown change type'); // todo: may want to handle this incase new change types come in the future
    }
  });

  // Add the components to the return array if they exist.
  // todo: consider refactoring this entire function to use the .some function
  const returnComponents = NewComponentArray('');
  if (approveComponents.length > 1) {
    returnComponents.push(...approveComponents, divider());
  }

  if (receiveComponents.length > 1) {
    returnComponents.push(...receiveComponents, divider());
  }

  if (transferComponents.length > 1) {
    returnComponents.push(...transferComponents, divider());
  }

  if (revokeApproveComponents.length > 1) {
    returnComponents.push(...revokeApproveComponents, divider());
  }

  return returnComponents;
};

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
      return '';
    // todo
  }
};

// For readability.
const TransferComponent = processStateChange;
const ReceiveComponent = processStateChange;
