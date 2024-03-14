import { Component, Panel, divider, panel } from '@metamask/snaps-ui';
import {
  SimulatedGas,
  StateChange,
  StateChangeType,
} from '../types/simulateApi';
import { AssetChangeComponent, NoStateChangesComponent } from '.';

/**
 * Creates a MetaMask Snap component based on a state change.
 *
 * @param stateChanges - The state changes from the Wallet Guard API.
 * @param gas - The gas fee estimate for this transaction.
 * @returns A MetaMask Snap component based on the results of the API call.
 */
export const StateChangesComponent = (
  stateChanges: StateChange[] | null,
  gas?: SimulatedGas,
): Panel => {
  if (stateChanges === null || stateChanges.length === 0) {
    if (!gas) {
      return NoStateChangesComponent();
    }
    return AssetChangeComponent(StateChangeType.Transfer, [], gas);
  }

  const output: Component[] = [];

  const receiveChanges = stateChanges.filter(
    (stateChange) => stateChange.changeType === StateChangeType.Receive,
  );

  const transferChanges = stateChanges.filter(
    (stateChange) => stateChange.changeType === StateChangeType.Transfer,
  );

  const approvalChanges = stateChanges.filter(
    (stateChange) => stateChange.changeType === StateChangeType.Approve,
  );

  const revokeChanges = stateChanges.filter(
    (stateChange) =>
      stateChange.changeType === StateChangeType.Revoke ||
      stateChange.changeType === StateChangeType.RevokeApprovalForAll,
  );

  // Show transferring assets first and show a gas estimate if there is one
  if (transferChanges.length > 0 || gas) {
    output.push(
      AssetChangeComponent(StateChangeType.Transfer, transferChanges, gas),
    );
    output.push(divider());
  }

  // Show receiving assets second
  if (receiveChanges.length > 0) {
    output.push(AssetChangeComponent(StateChangeType.Receive, receiveChanges));
    output.push(divider());
  }

  // Show approval changes
  if (approvalChanges.length > 0) {
    output.push(AssetChangeComponent(StateChangeType.Approve, approvalChanges));
    output.push(divider());
  }

  // Show revoking changes
  if (revokeChanges.length > 0) {
    output.push(AssetChangeComponent(StateChangeType.Revoke, revokeChanges));
    output.push(divider());
  }

  // Remove the final divider at the end of state changes
  output.pop();

  return panel(output);
};
