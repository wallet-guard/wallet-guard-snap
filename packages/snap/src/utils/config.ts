import { ChainId } from '../types/chains';

export const SUPPORTED_CHAINS = [
  ChainId.ArbitrumMainnet,
  ChainId.EthereumMainnet,
  ChainId.PolygonMainnet,
];

export enum LocalStorageKeys {
  WalletAddress = 'wg-WalletAddress',
  HasRemindedApprovals = 'wg-HasRemindedApprovals',
}

export enum RpcRequestMethods {
  UpdateAccount = 'updateAccount',
}

export enum CronJobMethods {
  CheckApprovals = 'checkApprovals',
}
