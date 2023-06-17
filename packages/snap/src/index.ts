import {
  OnCronjobHandler,
  OnRpcRequestHandler,
  OnTransactionHandler,
  OnTransactionResponse,
} from '@metamask/snaps-types';
import { copyable, heading, panel, text } from '@metamask/snaps-ui';
import { fetchTransaction } from './fetchTransaction';
import { StateChangesComponent } from './components/StateChangesComponent';
import { ErrorType, SimulationWarningType } from './types/simulateApi';
import {
  ErrorComponent,
  InsufficientFundsComponent,
  RevertComponent,
  TooManyRequestsComponent,
  UnauthorizedComponent,
  UnsupportedChainComponent,
} from './components/errors';
import { SimulationOverviewComponent } from './components/SimulationOverviewComponent';
import { SUPPORTED_CHAINS } from './utils/config';
import { ChainId } from './types/chains';
import { getWalletAddress, updateWalletAddress } from './utils/account';

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
  // TODO: Bring this back if we want inApp notifications to add revoking reminders. Otherwise remove it
  // For example, if we detect that they haven't set this up yet, remind them.
  // give them the option to "remind me later" or "dont show again"
  // Do this with a confirmation flow (yes or no) => (if yes) prompt input

  // if (request.method === 'revokePrompt') {
  //   const walletAddress = await snap.request({
  //     method: 'snap_dialog', // todo: also look into notifications
  //     params: {
  //       type: 'prompt',
  //       content: panel([
  //         heading('What is the wallet address?'),
  //         text('Please enter the wallet address to be monitored'),
  //       ]),
  //       placeholder: '0x123...',
  //     },
  //   });

  //   // updateWalletAddress(walletAddress);

  //   return null;
  // } else
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

    return null;
  }
};

// Handle outgoing transactions.
export const onTransaction: OnTransactionHandler = async ({
  transaction,
  chainId,
  transactionOrigin,
}) => {
  if (!SUPPORTED_CHAINS.includes(chainId as ChainId)) {
    return UnsupportedChainComponent();
  }

  const response = await fetchTransaction(
    transaction,
    chainId,
    transactionOrigin,
  );

  if (response.error) {
    return showErrorResponse(response.error.type);
  } else if (!response.simulation || response.simulation?.error) {
    return showErrorResponse(ErrorType.GeneralError);
  }

  if (
    response.simulation.warningType === SimulationWarningType.Info ||
    response.simulation.warningType === SimulationWarningType.Warn
  ) {
    return {
      content: panel([
        SimulationOverviewComponent(response.simulation.message),
        StateChangesComponent(response.simulation.stateChanges),
      ]),
    };
  }

  return {
    content: StateChangesComponent(response.simulation.stateChanges),
  };
};

export const onCronjob: OnCronjobHandler = async ({ request }) => {
  const walletAddress = await getWalletAddress();

  // TODO: consider showing a notification as a reminder to set this up


  // User has not setup their approvals checking yet
  if (!walletAddress) {
    return;
  }

  if (request.method === 'checkApprovals') {
    // todo: consider making this a notification instead
    // todo: fetch from John's API. Only alert if there's
    // a bad approval out that puts money at risk
    // todo: fetch wallet address from local storage

    await snap.request({
      method: 'snap_dialog',
      params: {
        type: 'alert',
        content: panel([
          heading(
            'You have an open approval that puts your Pudgy Penguin at risk',
          ),
          text(
            'Open approvals are abused by gasless signature scams. Bad actors can steal your NFTs and tokens if you sign a malicious signature. To revoke this open approval you can visit',
          ),
          copyable('https://dashboard.walletguard.app'),
        ]),
      },
    });

    return null;
  }
};

/**
 * Maps an error from the Wallet Guard API to a component.
 *
 * @param errorType - The mapped error response based on status code or any simulation related issues.
 * @returns OnTransactionResposnse - the output for OnTransaction hook.
 */
function showErrorResponse(errorType: ErrorType): OnTransactionResponse {
  switch (errorType) {
    case ErrorType.Revert:
      return RevertComponent();
    case ErrorType.InsufficientFunds:
      return InsufficientFundsComponent();
    case ErrorType.TooManyRequests:
      return TooManyRequestsComponent();
    case ErrorType.Unauthorized:
      return UnauthorizedComponent();
    default:
      return ErrorComponent();
  }
}
