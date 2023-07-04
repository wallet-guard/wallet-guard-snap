import {
  OnCronjobHandler,
  OnRpcRequestHandler,
  OnTransactionHandler,
} from '@metamask/snaps-types';
import { copyable, heading, panel, text } from '@metamask/snaps-ui';
import { fetchTransaction } from './http/fetchTransaction';
import {
  StateChangesComponent,
  SimulationOverviewComponent,
  UnsupportedChainComponent,
  showErrorComponent,
  RiskFactorsComponent,
} from './components';
import {
  CronJobMethods,
  RpcRequestMethods,
  SUPPORTED_CHAINS,
} from './utils/config';
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

export const onRpcRequest: OnRpcRequestHandler = async ({ request }) => {
  if (
    request.method === RpcRequestMethods.UpdateAccount &&
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
  }

  return {
    content: panel([
      SimulationOverviewComponent(
        response.overviewMessage,
        response.recommendedAction,
      ),
      StateChangesComponent(response.stateChanges, response.gas),
      RiskFactorsComponent(response.riskFactors || []),
    ]),
  };
};

export const onCronjob: OnCronjobHandler = async ({ request }) => {
  if (request.method === CronJobMethods.CheckApprovals) {
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
