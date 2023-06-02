import { Json } from '@metamask/utils';

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
