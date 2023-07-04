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
import { fetchApprovals } from './http/fetchApprovals';
import { ApprovalRiskLevel } from './types/approvalsApi';
import { add3DotsMiddle } from './utils/helpers';

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
  if (origin !== 'https://dashboard.walletguard.app') {
    return;
  }

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

    if (walletAddress) {
      snap.request({
        method: 'snap_notify',
        params: {
          type: 'inApp',
          message: `Welcome to the Wallet Guard snap! You will now receive transaction simulations within MetaMask and automated notifications for revoking approvals on your address ${add3DotsMiddle(
            walletAddress,
            8,
          )}.
        If you ever need to access your dashboard you can do so at dashboard.walletguard.app`,
        },
      });
    }
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
          content: panel([
            heading('Complete onboarding'),
            text(
              'Get automated reminders to revoke open approvals that can put your assets at risk for fraud. Setup using our dashboard in under 2 minutes.',
            ),
            copyable('dashboard.walletguard.app'),
          ]),
        },
      });

      return;
    }

    const accountDetails = await fetchApprovals(walletAddress as string);

    if (!accountDetails) {
      return;
    }

    // TODO: consider storing a hash in localstorage here so that we don't keep on reminding
    // the user of the same approvals (I would get annoyed at this since there's no value at risk in my wallet)

    // TODO: Consider adding a settings panel to dashboard.walletguard.app where they can
    // 1: enable/disable simulation or revoking 2: update/remove the connected wallet for approval reminders

    const highRiskApprovalsLength = accountDetails.approvals.filter(
      (approval) => approval.riskLevel === ApprovalRiskLevel.High,
    ).length;

    if (highRiskApprovalsLength > 0) {
      snap.request({
        method: 'snap_notify',
        params: {
          type: 'inApp',
          message: `Warning: You have ${highRiskApprovalsLength} open ${highRiskApprovalsLength === 1 ? 'approval' : 'approvals'
            }
           which can put your assets at risk. Head to https://dashboard.walletguard.app/${walletAddress} to remediate`,
        },
      });
    }
  }
};
