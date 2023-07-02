import { Component, Panel, panel } from '@metamask/snaps-ui';
import {
  SimulatedGas,
  StateChange,
  StateChangeType,
} from '../types/simulateApi';
import { NoStateChangesComponent, AssetChangeComponent, GasComponent } from '.';

/**
 * Creates a MetaMask Snap component based on a state change.
 *
 * @param stateChanges - The state changes from the Wallet Guard API.
 * @param gas - The gas fee estimate for this transaction.
 * @returns A MetaMask Snap component based on the results of the API call.
 */
export const StateChangesComponent = (
  stateChanges: StateChange[] | null,
  gas: SimulatedGas,
): Panel => {
  if (stateChanges === null) {
    return NoStateChangesComponent();
  }

  const output: Component[] = [];

  const receiveChanges = stateChanges.filter(
    (stateChange) => stateChange.changeType === StateChangeType.Receive,
  );

  const transferChanges = stateChanges.filter(
    (stateChange) => stateChange.changeType === StateChangeType.Transfer,
  );

  // Show transferring assets first
  if (transferChanges?.length > 0) {
    output.push(
      AssetChangeComponent(StateChangeType.Transfer, transferChanges),
    );
  }

  // Show receiving assets second
  if (receiveChanges?.length > 0) {
    output.push(AssetChangeComponent(StateChangeType.Receive, receiveChanges));
  }

  output.push(GasComponent(gas));

  return panel(output);
};
