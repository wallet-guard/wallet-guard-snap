import { ChainId } from '../types/chains';

export const SUPPORTED_CHAINS = [
  ChainId.ArbitrumMainnet,
  ChainId.EthereumMainnet,
  ChainId.PolygonMainnet,
  ChainId.OptimismMainnet,
  ChainId.BaseMainnet,
];

export enum LocalStorageKeys {
  WalletAddress = 'wg-WalletAddress',
  HasRemindedApprovals = 'wg-HasRemindedApprovals',
}

export enum RpcRequestMethods {
  GetAccount = 'getAccount',
  UpdateAccount = 'updateAccount',
}

export enum CronJobMethods {
  CheckApprovals = 'checkApprovals',
}
