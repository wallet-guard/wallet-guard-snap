import {
  OnCronjobHandler,
  OnRpcRequestHandler,
  OnTransactionHandler,
} from '@metamask/snaps-types';
import { copyable, heading, panel, text } from '@metamask/snaps-ui';
import { fetchTransaction } from './http/fetchTransaction';
import { ErrorType } from './types/simulateApi';
import {
  StateChangesComponent,
  SimulationOverviewComponent,
  UnsupportedChainComponent,
  showErrorComponent,
  AdditionalWarningsComponent,
} from './components';
import { SUPPORTED_CHAINS } from './utils/config';
import { ChainId } from './types/chains';
import {
  getWalletAddress,
  setRemindedTrue,
  shouldRemindApprovals,
  updateWalletAddress,
} from './utils/account';

/**
 * Handle incoming JSON-RPC requests, sent through `wallet_invokeSnap`.
 *
 * @param args - The request handler args as object.
 * @param args.origin - The origin of the request, e.g., the website that
 * invoked the snap.
 * @param args.request - A validated JSON-RPC request object.
 * @returns The result of `snap_dialog`.
 * @throws If the request method is not valid for this snap.
 */

export const onRpcRequest: OnRpcRequestHandler = async ({
  // TODO: this might be a bad pattern bc it's not easy
  // for them to get their address with this popup open. maybe redirect them to walletguard.app/onboarding
  request,
}) => {
  if (
    request.method === 'updateAccount' &&
    'walletAddress' in request.params &&
    typeof request.params.walletAddress === 'string'
  ) {
    const { walletAddress } = request.params;

    if (!walletAddress) {
      throw new Error('no wallet address provided');
    }

    updateWalletAddress(walletAddress);
  }
};

// Handle outgoing transactions.
export const onTransaction: OnTransactionHandler = async ({
  transaction,
  chainId,
  transactionOrigin,
}) => {
  if (!SUPPORTED_CHAINS.includes(chainId as ChainId)) {
    return {
      content: UnsupportedChainComponent(),
    };
  }

  const response = await fetchTransaction(
    transaction,
    chainId,
    transactionOrigin,
  );

  if (response.error) {
    return {
      content: showErrorComponent(response.error.type),
    };
  } else if (!response.simulation || response.simulation?.error) {
    // TODO: simulation.error might have a type here that we don't catch?
    return {
      content: showErrorComponent(ErrorType.GeneralError),
    };
  }

  return {
    content: panel([
      SimulationOverviewComponent(
        response.simulation.overviewMessage,
        response.simulation.recommendedAction,
      ),
      StateChangesComponent(
        response.simulation.stateChanges,
        response.simulation.gas,
      ),
      AdditionalWarningsComponent(response.simulation.riskFactors),
    ]),
  };
};

export const onCronjob: OnCronjobHandler = async ({ request }) => {
  if (request.method === 'checkApprovals') {
    const walletAddress = await getWalletAddress();

    // User has not setup their approvals checking yet
    if (!walletAddress) {
      const shouldRemind = await shouldRemindApprovals();

      if (!shouldRemind) {
        return;
      }

      const userResponse = (await snap.request({
        method: 'snap_dialog',
        params: {
          type: 'confirmation',
          content: panel([
            heading(
              "We noticed you haven't setup automated approvals checking yet",
            ),
            text('Would you like to set this up?'),
          ]),
        },
      })) as boolean;

      await setRemindedTrue();

      if (!userResponse) {
        return;
      }

      await snap.request({
        method: 'snap_dialog',
        params: {
          type: 'alert',
          content: panel([
            heading('Complete onboarding'),
            text(
              'Visit our dashboard to setup automated approval reminders in under 2 minutes',
            ),
            copyable('dashboard.walletguard.app'),
          ]),
        },
      });
    }
  }
};
