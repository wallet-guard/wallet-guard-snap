export type Approval = {
  chainId: string;
  contractAddress: string;
  approvedAddress: string;
  tokenID: string;
  ercType: ERCType;
  approvalType: ApprovalChangeType;
  allowance: string;
  riskLevel: ApprovalRiskLevel;
};

export enum ApprovalRiskLevel {
  Low = 'LOW',
  High = 'HIGH',
}

export type Token = {
  chainId: string;
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

export type AccountDetail = {
  address: string;
  lastNotificationTimestamp: string;
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
