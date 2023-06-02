import { Json } from '@metamask/snaps-types';
import { SimulateRequestParams } from './types/simulateApi';

/**
 * Makes a fetch request to the Wallet Guard Simulate API based on the transaction. 
 * @param transaction - The transaction to simulate.
 * @param chainId - The chain ID of the transaction.
 * @param transactionOrigin - The origin of the transaction.
 * @returns The simulated response from the Wallet Guard Simulate API.
 */
export const fetchTransaction = async (
  transaction: {
    [key: string]: Json
  },
  chainId: string,
  transactionOrigin: string | undefined,
) => {
  var url = "";
  switch (chainId) {
    // Ethereum Mainnet
    case 'eip155:1':
      chainId = '1';
      url = 'http://localhost:8081/v0/eth/mainnet/transaction';
      break;
    case 'eip155:89':
      chainId = '137';
      url = 'http://localhost:8081/v0/polygon/mainnet/transaction';
    case 'eip155:a4b1':
      chainId = '42161';
      url = 'http://localhost:8081/v0/arb/mainnet/transaction';
  }

  // Make a request to the simulator
  const simulateRequest: SimulateRequestParams = {
    id: '1',
    chainID: chainId,
    signer: transaction.from as string,
    origin: transactionOrigin as string,
    method: 'eth_sendTransaction',
    transaction: transaction,
  };

  const response = await fetch(
    url,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(simulateRequest),
    },
  );
  const json = await response.json();
  return json;
};
