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
  chainId: string;
  signer: string;
  origin: string;
  method: string;
  transaction: {
    [key: string]: Json;
  };
  source: 'SNAP';
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

export enum RecommendedActionType {
  None = 'NONE',
  Warn = 'WARN',
  Block = 'BLOCK',
}

export type SimulationResponse = {
  recommendedAction: RecommendedActionType;
  overviewMessage: string;
  stateChanges: StateChange[] | null;
  addressDetails: SimulationAddressDetails;
  method: SimulationMethodType | string;
  decodedMessage?: string; // Only present on signatures
  riskFactors: RiskFactor[] | null;
  gas: SimulatedGas;
  error: SimulationError | null;
};

// TODO: Should all of these be strings?
export type SimulatedGas = {
  gasUsedEth: string;
  fiatValue: string;
  currency: string;
};

export type RiskFactor = {
  severity: Severity;
  type: WarningType;
  message: string;
  value: string;
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
// TODO: Should all of these be strings?
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

export enum WarningType {
  Similarity = 'SIMILARITY',
  RecentlyCreated = 'RECENTLY_CREATED',
  Malware = 'MALWARE',
  Homoglyph = 'HOMOGLYPH',
  Blocklisted = 'BLOCKLISTED',
  MLInference = 'ML_INFERENCE',
  Drainer = 'DRAINER',
  BlurListing = 'BLUR_LISTING',
  OpenseaListing = 'OPENSEA_LISTING',
  EthSign = 'ETH_SIGN',
  LooksrareListing = 'LOOKSRARE_LISTING',
}

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
