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
}) => {
  if (
    // TODO: Consider adding a getAccount method for the dashboard to hook into & manage state with
    origin === 'https://dashboard.walletguard.app' &&
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
      RiskFactorsComponent(response.simulation.riskFactors || []),
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
              'Get automated reminders to revoke your open approvals that can put your assets at risk for fraud. Setup using our dashboard in under 2 minutes',
            ),
            copyable('dashboard.walletguard.app'),
          ]),
        },
      });

      return;
    }

    const approvals = await fetchApprovals(walletAddress as string);

    // TODO: consider storing a hash in localstorage here so that we don't keep on reminding
    // the user of the same approvals (I would get annoyed at this since there's no value at risk in my wallet)

    // TODO: Consider adding a settings panel to dashboard.walletguard.app where they can
    // 1: enable/disable simulation or revoking 2: update/remove the connected wallet for approval reminders

    const highRiskApprovals = approvals.approvals.filter(
      (approval) => approval.riskLevel === ApprovalRiskLevel.High,
    );

    if (highRiskApprovals.length > 0) {
      snap.request({
        method: 'snap_notify',
        params: {
          type: 'inApp',
          message: `Warning: You have ${approvals.approvals.length} open ${approvals.approvals.length === 1 ? 'approval' : 'approvals'
            } which can put your assets at risk. Head to https://dashboard.walletguard.app/${walletAddress} to remediate`,
        },
      });
    }
  }
};
