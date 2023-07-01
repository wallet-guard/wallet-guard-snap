export type Approval = {
  contractAddress: string;
  approvedAddress: string;
  tokenID: string;
  ercType: ERCType;
  approvalType: ApprovalChangeType;
  amount: string; // do we need this? why does this exist on both approval and token? is this allowance?
};

export type Token = {
  chainID: string;
  contractAddress: string;
  ercType: ERCType;
  tokenID: string;
  amount: string;

  // Metadata about token
  fiatValue: string;
  name: string;
  symbol: string;
  logo: string;
};

export type ApprovalReponse = {
  address: string;
  approvals: Approval[];
  tokens: Token[];
  errors: ApprovalError[];
};

export type ApprovalError = {
  code: number;
  error: string;
};

export enum ERCType {
  ERC20 = 'ERC20',
  ERC721 = 'ERC721',
  ERC1155 = 'ERC1155',
}

export enum ApprovalChangeType {
  Approval = 'Approval',
  Transfer = 'Transfer',
  ApprovalForAll = 'ApprovalForAll',
  TransferSingle = 'TransferSingle',
  TransferBatch = 'TransferBatch',
}
