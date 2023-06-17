import { WALLET_ADDRESS_KEY } from '../config';

export const getWalletAddress = async (): Promise<string | null> => {
  const data = await snap.request({
    method: 'snap_manageState',
    params: {
      operation: 'get',
    },
  });

  if (
    !data ||
    !(WALLET_ADDRESS_KEY in data) ||
    typeof data[WALLET_ADDRESS_KEY] !== 'string'
  ) {
    return null;
  }

  return data[WALLET_ADDRESS_KEY];
};

export const updateWalletAddress = (walletAddress: string | null) => {
  snap.request({
    method: 'snap_manageState',
    params: {
      operation: 'update',
      newState: { [WALLET_ADDRESS_KEY]: walletAddress },
    },
  });
};
