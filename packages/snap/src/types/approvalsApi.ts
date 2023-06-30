export type Approval = {
  address: string;
  chainID: string;
  contractAddress: string;
  approvedAddress: string;
  tokenID: string;
  ERCType: string; // todo: add type here
  ApprovalType: string; // todo: add type here
};

export type TokenOwner = {
  address: string;
  chainID: string;
  contractAddress: string;
  tokenID: string;
  amount: string;
};
