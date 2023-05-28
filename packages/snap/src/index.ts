import {
  OnRpcRequestHandler,
  OnTransactionHandler,
} from '@metamask/snaps-types';
import { NodeType, divider, heading, panel, text } from '@metamask/snaps-ui';
import { Json } from '@metamask/utils';

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

type SimulateRequest = {
  id: string;
  chainID: string;
  signer: string;
  origin: string;
  method: string;
  transaction: {
    [key: string]: Json;
  };
};

type StateChange = {
  assetType: string;
  changeType: string;
  address: string;
  amount: string;
  symbol: string;
  decimals: number;
  contractAddress: string;
  name: string;
  logo: string;
  tokenID: string;
  tokenURI: string;
  tokenName: string;
  openSeaFloorPrice: number;
  openSeaVerified: boolean;
  openSeaLink: string;
  etherscanVerified: boolean;
  etherscanLink: string;
  coinmarketcapLink: string;
  message: string;
  fiatValue: string;
};

// Handle outgoing transactions.
export const onTransaction: OnTransactionHandler = async ({
  transaction,
  chainId,
  transactionOrigin,
}) => {
  console.log('transaction', transaction);

  switch (chainId) {
    case 'eip155:1':
      chainId = '1';
      break;
  }

  // Make a request to the simulator
  const simulateRequest: SimulateRequest = {
    id: '1',
    chainID: chainId,
    signer: transaction.from as string,
    origin: transactionOrigin as string,
    method: 'eth_sendTransaction',
    transaction: transaction,
  };

  console.log('simulateRequest', simulateRequest);

  const response = await fetch(
    'http://localhost:8081/v0/eth/mainnet/transaction',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(simulateRequest),
    },
  );
  const json = await response.json();
  console.log('response', JSON.stringify(json));

  console.log(
    'componentController',
    JSON.stringify(ComponentController(json.stateChanges)),
  );
  // Display percentage of gas fees in the transaction insights UI.
  return {
    content: panel(ComponentController(json.stateChanges)),
  };
};

const ComponentController = (stateChanges: StateChange[]) => {
  console.log('stateChanges', JSON.stringify(stateChanges));
  var receiveComponents: (
    | {
        value: string;
        type: NodeType.Copyable;
      }
    | {
        type: NodeType.Divider;
      }
    | {
        value: string;
        type: NodeType.Heading;
      }
    | {
        type: NodeType.Spinner;
      }
    | {
        value: string;
        type: NodeType.Text;
      }
  )[] = [heading('You will receive:')];

  var transferComponents: (
    | {
        value: string;
        type: NodeType.Copyable;
      }
    | {
        type: NodeType.Divider;
      }
    | {
        value: string;
        type: NodeType.Heading;
      }
    | {
        type: NodeType.Spinner;
      }
    | {
        value: string;
        type: NodeType.Text;
      }
  )[] = [heading('You will send:')];

  // Sort state changes into receive and withdrawn
  stateChanges.forEach((stateChange: StateChange) => {
    switch (stateChange.changeType) {
      case 'RECEIVE':
        receiveComponents.push(...ComponentFactory(stateChange));
        break;
      case 'TRANSFER':
        transferComponents.push(...ComponentFactory(stateChange));
        break;
    }
  });
  console.log('receiveComponents', JSON.stringify(receiveComponents));
  console.log('transferComponents', JSON.stringify(transferComponents));
  return [...receiveComponents, divider(), ...transferComponents];
};

const ComponentFactory = (stateChange: StateChange) => {
  var components: (
    | {
        value: string;
        type: NodeType.Copyable;
      }
    | {
        type: NodeType.Divider;
      }
    | {
        value: string;
        type: NodeType.Heading;
      }
    | {
        type: NodeType.Spinner;
      }
    | {
        value: string;
        type: NodeType.Text;
      }
  )[] = [];
  switch (stateChange.assetType) {
    case 'NATIVE':
    case 'ERC1155':
    case 'ERC20':
      components.push(
        text(
          `${stateChange.amount} ${stateChange.symbol} ($${stateChange.fiatValue})`,
        ),
      );
      break;
    case 'ERC721':
      components.push(
        text(`${stateChange.tokenName} ($${stateChange.fiatValue})`),
      );
      break;
    case 'Security':
      SecurityComponent(stateChange);
      break;
  }
  console.log('components', JSON.stringify(components));
  return components;
};

const SecurityComponent = (stateChange: StateChange) => {};
