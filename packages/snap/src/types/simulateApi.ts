// eslint-disable-next-line import/no-extraneous-dependencies
import { Json } from '@metamask/utils';

export type ApiResponse = {
  readonly type: ResponseType;
  // Only set on success.
  readonly simulation?: SimulationResponse;
  // Might be set on error.
  readonly error?: SimulationError;
};

export enum ResponseType {
  Success = 'success',
  Revert = 'revert',
  Errored = 'error',
}

export type SimulationErrorResponse = {
  error: SimulationError;
};

/**
 * Parameters for the request to the Wallet Guard Simulate API.
 */
export type SimulateRequestParams = {
  id: string;
  chainID: string;
  signer: string;
  origin: string;
  method: string;
  transaction: {
    [key: string]: Json;
  };
  source: 'SNAP'; // todo: consider sending this as a header instead
};

// The only method supported by Snaps on launch is eth_sendTransaction
export enum SimulationMethodType {
  EthSendTransaction = 'eth_sendTransaction',
}

export enum SimulationAssetTypes {
  ERC20 = 'ERC20',
  ERC721 = 'ERC721',
  ERC1155 = 'ERC1155',
  Native = 'NATIVE',
}

export enum WarningType {
  None = 'NONE',
  Warn = 'WARN',
  Block = 'BLOCK',
}

export type SimulationResponse = {
  warningType: WarningType;
  overviewMessage: string;
  stateChanges: StateChange[] | null;
  addressDetails: SimulationAddressDetails;
  method: SimulationMethodType | string;
  decodedMessage?: string;
  riskFactors: RiskFactor[];
  error: SimulationError | null;
};

export type RiskFactor = {
  severity: Severity;
  type: string;
  message: string;
};

export type SimulationAddressDetails = {
  address: string;
  addressType: string;
  etherscanVerified: boolean;
  etherscanLink: string;
};

/*
 * State change object that is within the response returned by the Wallet Guard Simulate API.
 */
export type StateChange = {
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

export type SimulationError = {
  type: ErrorType;
  message: string;
  extraData: object | null;
};

export enum Severity {
  Low = 'LOW',
  High = 'HIGH',
  Critical = 'CRITICAL',
}

export enum ErrorType {
  Unauthorized = 'UNAUTHORIZED',
  InsufficientFunds = 'INSUFFICIENT_FUNDS',
  MaxFeePerGasLessThanBlockBaseFee = 'MAX_FEE_PER_GAS_LESS_THAN_BLOCK_BASE_FEE',
  Revert = 'REVERT',
  TooManyRequests = 'TOO_MANY_REQUESTS',
  GeneralError = 'ERROR',
  UnknownError = 'UNKNOWN_ERROR',
}

export enum StateChangeType {
  Receive = 'RECEIVE',
  Transfer = 'TRANSFER',
}
