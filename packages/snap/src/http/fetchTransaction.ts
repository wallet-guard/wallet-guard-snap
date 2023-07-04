import { Json } from '@metamask/snaps-types';
import {
  Currency,
  ErrorType,
  SimulateRequestParams,
  SimulationErrorResponse,
  SimulationResponse,
  SimulationSuccessApiResponse,
} from '../types/simulateApi';
import { SERVER_BASE_URL } from '../utils/environment';
import { ChainId } from '../types/chains';

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
  try {
    const mappedChainId = mapChainId(chainId);
    const requestURL = getURLForChainId(chainId);

    // Make a request to the simulator
    const simulateRequest: SimulateRequestParams = {
      id: crypto.randomUUID(),
      chainId: mappedChainId,
      signer: transaction.from as string,
      origin: transactionOrigin as string,
      method: transaction.method as string,
      transaction,
      source: 'SNAP',
    };

    const response = await fetch(requestURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(simulateRequest),
    });

    if (response.status === 200) {
      const data: SimulationSuccessApiResponse = await response.json();

      // TODO: Hardcode for now until we get the real data from the API
      // data.gas = {
      //   gasUsedEth: '',
      //   currency: Currency.USD,
      //   fiatValue: '13.50',
      // };

      return data;
    } else if (response.status === 403) {
      const result: SimulationErrorResponse = {
        error: {
          type: ErrorType.Unauthorized,
          message: 'Unauthorized',
          extraData: null,
        },
      };

      return result;
    } else if (response.status === 429) {
      const result: SimulationErrorResponse = {
        error: {
          type: ErrorType.TooManyRequests,
          message: 'Rate limit hit',
          extraData: null,
        },
      };

      return result;
    }

    const result: SimulationErrorResponse = {
      error: {
        type: ErrorType.GeneralError,
        message: 'Unrecognized status code returned',
        extraData: null,
      },
    };

    return result;
  } catch (e: any) {
    const result: SimulationErrorResponse = {
      error: {
        type: ErrorType.UnknownError,
        message: 'an unknown error has occurred',
        extraData: null,
      },
    };

    return result;
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
      throw new Error('chain not supported');
  }
}
