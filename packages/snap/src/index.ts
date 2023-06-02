import {
  OnRpcRequestHandler,
  OnTransactionHandler,
} from '@metamask/snaps-types';
import { NodeType, divider, heading, panel, text } from '@metamask/snaps-ui';
import { Json } from '@metamask/utils';
import { SimulateRequestParams, StateChange } from './types/simulateApi';
import { fetchTransaction } from './fetchTransaction';
import { StateChangeComponent } from './components/stateChangeComponent';

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
export const onRpcRequest: OnRpcRequestHandler = ({ origin, request }) => {
  switch (request.method) {
    case 'hello':
      return snap.request({
        method: 'snap_dialog',
        params: {
          type: 'confirmation',
          content: panel([
            text(`Hello, **${origin}**!`),
            text('This custom confirmation is just for display purposes.'),
            text(
              'But you can edit the snap source code to make it do something, if you want to!',
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
