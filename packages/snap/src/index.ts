import {
  OnCronjobHandler,
  OnRpcRequestHandler,
  OnTransactionHandler,
} from '@metamask/snaps-types';
import { copyable, divider, heading, panel, text } from '@metamask/snaps-ui';
import { fetchTransaction } from './fetchTransaction';
import { StateChangeComponent } from './components/stateChangeComponent';


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
  console.log('transaction', transaction);

  const response = await fetchTransaction(
    transaction,
    chainId,
    transactionOrigin,
  );

  // Handle transactions with errors.
  if (response.error) {
    return {
      content: panel([text('Error: ' + response.error.message)]),
    };
  }

  // Add warning if simulation warning is present.
  if (response.warningType === 'WARN' || response.warningType === 'INFO') {
    return {
      content: panel([
        heading('Overview Message'),
        text(response.warningMessage),
        divider(),
        ...StateChangeComponent(response.stateChanges),
      ]),
    };
  }

  return {
    content: panel(StateChangeComponent(response.stateChanges)),
  };
};

export const onCronjob: OnCronjobHandler = async ({ request }) => {
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
