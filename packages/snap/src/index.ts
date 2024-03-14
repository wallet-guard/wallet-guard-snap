import {
  OnCronjobHandler,
  OnRpcRequestHandler,
  OnTransactionHandler,
} from '@metamask/snaps-types';
import { panel } from '@metamask/snaps-ui';
import { fetchTransaction } from './http/fetchTransaction';
import {
  StateChangesComponent,
  SimulationOverviewComponent,
  UnsupportedChainComponent,
  showErrorComponent,
  RiskFactorsComponent,
  OnboardingReminderComponent,
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
import { fetchApprovals } from './http/fetchApprovals';
import {
  generateApprovalsMessage,
  isDashboard,
  isValidEthereumAddress,
} from './utils/helpers';

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
  origin,
  request,
}): Promise<any> => {
  if (!isDashboard(origin)) {
    return;
  }

  if (
    request.method === RpcRequestMethods.UpdateAccount &&
    request.params &&
    'walletAddress' in request.params &&
    typeof request.params.walletAddress === 'string'
  ) {
    const { walletAddress } = request.params;

    if (!walletAddress) {
      throw new Error('no wallet address provided');
    }

    const isValidAddress = isValidEthereumAddress(walletAddress);

    if (!isValidAddress) {
      throw new Error('invalid wallet address provided');
    }

    updateWalletAddress(walletAddress);

    await snap.request({
      method: 'snap_notify',
      params: {
        type: 'inApp',
        message: `Welcome! Dashboard URL: dashboard.walletguard.app`,
      },
    });
  } else if (request.method === RpcRequestMethods.GetAccount) {
    const walletAddress = await getWalletAddress();

    // eslint-disable-next-line consistent-return
    return walletAddress;
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

      setRemindedTrue();

      await snap.request({
        method: 'snap_dialog',
        params: {
          type: 'alert',
          content: OnboardingReminderComponent(),
        },
      });

      return;
    }

    const approvalNotification = await fetchApprovals(walletAddress);

    if (!approvalNotification) {
      return;
    }

    const approvalsWarning = generateApprovalsMessage(approvalNotification);

    if (!approvalsWarning) {
      return;
    }

    await snap.request({
      method: 'snap_notify',
      params: {
        type: 'inApp',
        message: approvalsWarning,
      },
    });
  }
};
