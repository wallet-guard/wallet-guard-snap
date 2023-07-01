import {
  OnCronjobHandler,
  OnRpcRequestHandler,
  OnTransactionHandler,
} from '@metamask/snaps-types';
import { heading, panel, text } from '@metamask/snaps-ui';
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
            heading("We noticed you haven't setup approvals checking yet"),
            text(
              'Would you like to set this up? No wallet connection neccessary.',
            ),
          ]),
        },
      })) as boolean;

      setRemindedTrue();

      if (!userResponse) {
        return;
      }

      const inputAddress: string = (await snap.request({
        method: 'snap_dialog',
        params: {
          type: 'prompt',
          content: panel([
            heading('What is the wallet address?'),
            text('Please enter the wallet address to be monitored'),
          ]),
          placeholder: '0x123...',
        },
      })) as string;

      updateWalletAddress(inputAddress);
    }

    // todo: consider making this a notification instead
    // todo: fetch from John's API. Only alert if there's
    // a bad approval out that puts money at risk

    //   await snap.request({
    //     method: 'snap_dialog',
    //     params: {
    //       type: 'alert',
    //       content: panel([
    //         heading(
    //           'You have an open approval that puts your Pudgy Penguin at risk',
    //         ),
    //         text(
    //           'Open approvals are abused by gasless signature scams. Bad actors can steal your NFTs and tokens if you sign a malicious signature. To revoke this open approval you can visit',
    //         ),
    //         copyable('https://dashboard.walletguard.app'),
    //       ]),
    //     },
    //   });
    // }
  }
};
