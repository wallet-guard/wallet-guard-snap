import { Component, Panel, divider, panel } from '@metamask/snaps-ui';
import { StateChange, StateChangeType } from '../types/simulateApi';
import { AssetChangeComponent } from './stateChanges/AssetChangeComponent';
import { NoStateChanges } from './stateChanges/NoChanges';

/**
 * Creates a MetaMask Snap component based on a state change.
 *
 * @param stateChanges - The state changes from the Wallet Guard API.
 * @returns A MetaMask Snap component based on the results of the API call.
 */
export const StateChangesComponent = (
  stateChanges: StateChange[] | null,
): Panel => {
  if (stateChanges === null) {
    // todo: consider showing the address/ contract they're interacting with like the extension. Make sure there aren't any cases that get conflated here
    return NoStateChanges;
  }

  const output: Component[] = [];

  const receiveChanges = stateChanges.filter(
    (stateChange) => stateChange.changeType === StateChangeType.Receive,
  );

  const transferChanges = stateChanges.filter(
    (stateChange) => stateChange.changeType === StateChangeType.Transfer,
  );

  if (receiveChanges?.length > 0) {
    output.push(AssetChangeComponent(StateChangeType.Receive, receiveChanges));
    output.push(divider());
  }

  if (transferChanges?.length > 0) {
    output.push(
      AssetChangeComponent(StateChangeType.Transfer, transferChanges),
    );
  }

  return panel(output);
};