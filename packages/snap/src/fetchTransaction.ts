import { Json } from '@metamask/snaps-types';
import { SimulateRequestParams, SimulationMethodType, SimulationResponse } from './types/simulateApi';
import { SERVER_BASE_URL } from './environment';

/**
 * Makes a fetch request to the Wallet Guard Simulate API based on the transaction.
 *
 * @param transaction - The transaction to simulate.
 * @param chainId - The chain ID of the transaction.
 * @param transactionOrigin - The origin of the transaction.
 * @returns The simulated response from the Wallet Guard Simulate API.
 */
export const fetchTransaction = async (
  transaction: {
    [key: string]: Json;
  },
  chainId: string,
  transactionOrigin: string | undefined,
): Promise<SimulationResponse> => {
  const mappedChainId = mapChainId(chainId);
  const requestURL = getURLForChainId(chainId);

  // Make a request to the simulator
  const simulateRequest: SimulateRequestParams = {
    id: `snap:${crypto.randomUUID()}`,
    chainID: mappedChainId,
    signer: transaction.from as string,
    origin: transactionOrigin as string,
    method: SimulationMethodType.EthSendTransaction,
    transaction,
  };

  const response = await fetch(requestURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(simulateRequest),
  });

  // todo: add mapper fn for errors (add try catch here?)
  // test this with different errors

  const json = await response.json();

  return json;
};

/**
 * Maps the chainId to the relevant base URL for our API
 *
 * @param chainId - the chainId of the request sent from the Metamask Snap
 * @returns the mapped chainId for our API
 */
function getURLForChainId(chainId: string): string {
  switch (chainId) {
    // Ethereum Mainnet
    case 'eip155:1':
      return `${SERVER_BASE_URL}/v0/eth/mainnet/transaction`;
    // Polygon Mainnet
    case 'eip155:89':
      return `${SERVER_BASE_URL}/v0/polygon/mainnet/transaction`;
    // Arbitrum Mainnet
    case 'eip155:a4b1':
      return `${SERVER_BASE_URL}/v0/arb/mainnet/transaction`;
    default:
      // throw ; TODO
      throw new Error('chain not supported');
  }
}

/**
 * Maps the chainId to conform to our API.
 *
 * @param chainId - the chainId of the request sent from the Metamask Snap
 * @returns the mapped chainId for our API
 */
function mapChainId(chainId: string): string {
  switch (chainId) {
    // Ethereum Mainnet
    case 'eip155:1':
      return '1';
    // Polygon Mainnet
    case 'eip155:89':
      return '137';
    // Arbitrum Mainnet
    case 'eip155:a4b1':
      return '42161';
    default:
      // return '1'; TODO
      throw new Error('chain not supported');
  }
}
