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

  if (
    !data ||
    !(LocalStorageKeys.HasRemindedApprovals in data) ||
    typeof data[LocalStorageKeys.HasRemindedApprovals] !== 'boolean'
  ) {
    return false;
  }

  return data[LocalStorageKeys.HasRemindedApprovals];
};

export const setRemindedTrue = () => {
  snap.request({
    method: 'snap_manageState',
    params: {
      operation: 'update',
      newState: { [LocalStorageKeys.HasRemindedApprovals]: true },
    },
  });
};
