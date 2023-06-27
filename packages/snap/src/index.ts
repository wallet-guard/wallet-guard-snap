import {
  OnCronjobHandler,
  OnRpcRequestHandler,
  OnTransactionHandler,
  OnTransactionResponse,
} from '@metamask/snaps-types';
import { copyable, heading, panel, text } from '@metamask/snaps-ui';
import { fetchTransaction } from './fetchTransaction';
import { ErrorType } from './types/simulateApi';
import {
  ErrorComponent,
  InsufficientFundsComponent,
  RevertComponent,
  TooManyRequestsComponent,
  UnauthorizedComponent,
} from './components/errors';
import { SUPPORTED_CHAINS } from './config';
import { ChainId } from './types/chains';
import { UnsupportedChainComponent } from './components/errors/UnsupportedChain';

const WALLET_ADDRESS_KEY = 'wgWalletAddress';
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
  if (request.method === 'revokePrompt') {
    const walletAddress = await snap.request({
      method: 'snap_dialog', // todo: also look into notifications
      params: {
        type: 'prompt',
        content: panel([
          heading('What is the wallet address?'),
          text('Please enter the wallet address to be monitored'),
        ]),
        placeholder: '0x123...',
      },
    });

    snap.request({
      method: 'snap_manageState',
      params: {
        operation: 'update',
        newState: { [WALLET_ADDRESS_KEY]: walletAddress },
      },
    });

    return null;
  }

  switch (request.method) {
    case 'notifyInApp':
      return snap.request({
        method: 'snap_notify',
        params: {
          type: 'inApp',
          message: 'Hello, world!',
        },
      });
    case 'notifyNative':
      return snap.request({
        method: 'snap_notify',
        params: {
          type: 'native',
          message: 'Hello, world!',
        },
      });
    case 'getAddress':
      return snap.request({
        method: 'snap_manageState',
        params: {
          operation: 'get',
        },
      });
    case 'revokePrompt':
      return snap.request({
        method: 'snap_dialog', // todo: also look into notifications
        params: {
          type: 'prompt',
          content: panel([
            heading('What is the wallet address?'),
            text('Please enter the wallet address to be monitored'),
          ]),
          placeholder: '0x123...',
        },
      });
    case 'hello':
      return snap.request({
        method: 'snap_dialog',
        params: {
          type: 'confirmation',
          content: panel([
            text(`Hello, **${origin}**!`),
            text('This custom confirmation is just for display purposes.'),
            text(
              'But you can edit the snap source code to make it do something, if you want to! ✅',
            ),
          ]),
        },
      });
    default:
      throw new Error('Method not found.');
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

  return {
    content: panel([
      text('🚨 WARNING: You are sending all your ETH for nothing in return'),
      SimulationOverviewComponent(['hello jacob', 'testing']),
      StateChangesComponent(response.simulation.stateChanges),
    ]),
  };

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
    content: panel([
      panel([heading('hello')]),
      text('this is a ui test'),
      text('hello 2'),
      panel([heading('hello again'), text('world')]),
    ]),
  };
};

export const onCronjob: OnCronjobHandler = async ({ request }) => {
  const walletAddress = await snap.request({
    method: 'snap_manageState',
    params: {
      operation: 'get',
    },
  });

  // User has not setup their approvals checking yet
  // TODO: consider showing a notification as a reminder to set this up

  // TODO NEXT: integrate this with our webflow - both flows. Either monitoring via address entry or personal_sign
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
