import { divider, text } from '@metamask/snaps-ui';
import { StateChange } from '../types/simulateApi';
import { NewComponentArray } from './ComponentArray';

/**
 * Creates a MetaMask Snap component based on a state change.
 *  
 * @param stateChanges - The state changes from the Wallet Guard API.
 * @returns A MetaMask Snap component based on the results of the API call.
 */
export const StateChangeComponent = (stateChanges: StateChange[]) => {
  if (stateChanges === null) {
    return NewComponentArray('No state changes');
  }

  console.log('stateChanges', JSON.stringify(stateChanges));
  var receiveComponents = NewComponentArray('You will receive:');
  var transferComponents = NewComponentArray('You will send:');
  var approveComponents = NewComponentArray('You will be approving:');
  var revokeApproveComponents = NewComponentArray(
    'You will be revoking approval for:',
  );

  // Sort state changes into the receive, transfer, approve, and revoke approve arrays. 
  stateChanges.forEach((stateChange: StateChange) => {
    switch (stateChange.changeType) {
      case 'REVOKE_APPROVAL_FOR_ALL':
        revokeApproveComponents.push(text(stateChange.message));
        break;
      case 'APPROVAL_FOR_ALL':
        approveComponents.push(text(stateChange.message));
        break;
      case 'APPROVE':
        approveComponents.push(text(stateChange.message));
        break;
      case 'REVOKE_APPROVE':
        revokeApproveComponents.push(text(stateChange.message));
        break;
      case 'TRANSFER':
        var component = TransferComponent(stateChange);
        if (component) {
          transferComponents.push(component);
        }
        break;
      case 'RECEIVE':
        var component = ReceiveComponent(stateChange);
        if (component) {
          receiveComponents.push(component);
        }
        break;
    }
  });

  // Add the components to the return array if they exist.
  var returnComponents = NewComponentArray('');
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
  switch (stateChange.assetType) {
    case 'NATIVE':
    case 'ERC1155':
    case 'ERC20':
      return text(
        `${stateChange.amount} ${stateChange.symbol} ($${stateChange.fiatValue})`,
      );
    case 'ERC721':
      return text(`${stateChange.tokenName} ($${stateChange.fiatValue})`);
  }
};

// For readability.
const TransferComponent = processStateChange;
const ReceiveComponent = processStateChange;
