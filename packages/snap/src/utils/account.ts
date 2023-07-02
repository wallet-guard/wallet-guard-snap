import { LocalStorageKeys } from './config';

export const getWalletAddress = async (): Promise<string | null> => {
  const data = await snap.request({
    method: 'snap_manageState',
    params: {
      operation: 'get',
    },
  });

  if (
    !data ||
    !(LocalStorageKeys.WalletAddress in data) ||
    typeof data[LocalStorageKeys.WalletAddress] !== 'string'
  ) {
    return null;
  }

  return data[LocalStorageKeys.WalletAddress];
};

export const updateWalletAddress = (walletAddress: string | null) => {
  snap.request({
    method: 'snap_manageState',
    params: {
      operation: 'update',
      newState: { [LocalStorageKeys.WalletAddress]: walletAddress },
    },
  });
};

export const shouldRemindApprovals = async (): Promise<boolean> => {
  const data = await snap.request({
    method: 'snap_manageState',
    params: {
      operation: 'get',
    },
  });

  console.log(data);

  // If they haven't been reminded yet
  if (!data || !(LocalStorageKeys.HasRemindedApprovals in data)) {
    return true;
  }

  // If the key exists, it has already reminded and should return false
  return false;
};

export const setRemindedTrue = async () => {
  await snap.request({
    method: 'snap_manageState',
    params: {
      operation: 'update',
      newState: { [LocalStorageKeys.HasRemindedApprovals]: true },
    },
  });
};
