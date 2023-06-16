import { Json } from '@metamask/snaps-types';
import {
  ApiResponse,
  ErrorType,
  ResponseType,
  SimulateRequestParams,
  SimulationResponse,
} from './types/simulateApi';
import { SERVER_BASE_URL } from './environment';
import { ChainId } from './types/chains';

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
): Promise<ApiResponse> => {
  try {
    const mappedChainId = mapChainId(chainId);
    const requestURL = getURLForChainId(chainId);

    // Make a request to the simulator
    const simulateRequest: SimulateRequestParams = {
      id: crypto.randomUUID(),
      chainID: mappedChainId,
      signer: transaction.from as string,
      origin: transactionOrigin as string,
      method: transaction.method as string,
      transaction,
      source: 'snap',
    };

    const response = await fetch(requestURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(simulateRequest),
    });

    if (response.status === 200) {
      const data: SimulationResponse = await response.json();

      if (data.error?.type === ErrorType.Revert) {
        return {
          type: ResponseType.Revert,
          error: data.error,
        };
      }

      return {
        type: ResponseType.Success,
        simulation: data,
      };
    } else if (response.status === 403) {
      return {
        type: ResponseType.Errored,
        error: {
          type: ErrorType.Unauthorized,
          message: 'Unauthorized',
          extraData: null,
        },
      };
    } else if (response.status === 429) {
      return {
        type: ResponseType.Errored,
        error: {
          type: ErrorType.TooManyRequests,
          message: 'TooManyRequests',
          extraData: null,
        },
      };
    }

    const data: SimulationResponse = await response.json();

    if (!data.error) {
      throw Error('unrecognized response from api');
    }

    return { type: ResponseType.Errored, error: data.error };
  } catch (e: any) {
    return {
      error: {
        type: ErrorType.UnknownError,
        message: 'An unknown error occurred',
        extraData: e,
      },
      type: ResponseType.Errored,
    };
  }
};

/**
 * Maps the chainId to the relevant base URL for our API.
 *
 * @param chainId - The chainId of the request sent from the Metamask Snap.
 * @returns The mapped chainId for our API.
 */
function getURLForChainId(chainId: string): string {
  switch (chainId) {
    case ChainId.EthereumMainnet:
      return `${SERVER_BASE_URL}/v0/eth/mainnet/transaction`;
    case ChainId.PolygonMainnet:
      return `${SERVER_BASE_URL}/v0/polygon/mainnet/transaction`;
    case ChainId.ArbitrumMainnet:
      return `${SERVER_BASE_URL}/v0/arb/mainnet/transaction`;
    default:
      // throw ; TODO
      throw new Error('chain not supported');
  }
}

/**
 * Maps the chainId to conform to our API.
 *
 * @param chainId - The chainId of the request sent from the Metamask Snap.
 * @returns The mapped chainId for our API.
 */
function mapChainId(chainId: string): string {
  switch (chainId) {
    case ChainId.EthereumMainnet:
      return '1';
    case ChainId.PolygonMainnet:
      return '137';
    case ChainId.ArbitrumMainnet:
      return '42161';
    default:
      // return '1'; TODO
      throw new Error('chain not supported');
  }
}
