import {
  ApprovalChangeType,
  AccountDetail,
  ApprovalRiskLevel,
  ERCType,
} from '../../types/approvalsApi';
import { ChainId } from '../../types/chains';

export const ApprovalsWithOneHighRiskWarning: AccountDetail = {
  address: '0x123',
  approvals: [
    {
      chainId: ChainId.EthereumMainnet,
      contractAddress: '0x11111',
      approvedAddress: '0x99999',
      tokenID: '5555',
      ercType: ERCType.ERC1155,
      approvalType: ApprovalChangeType.Approval,
      allowance: '1',
      riskLevel: ApprovalRiskLevel.High,
    },
  ],
  tokens: [],
  errors: [],
};

export const ApprovalsWithZeroHighRiskWarning: AccountDetail = {
  address: '0x123',
  approvals: [
    {
      chainId: ChainId.EthereumMainnet,
      contractAddress: '0x11111',
      approvedAddress: '0x99999',
      tokenID: '5555',
      ercType: ERCType.ERC1155,
      approvalType: ApprovalChangeType.Approval,
      allowance: '1',
      riskLevel: ApprovalRiskLevel.Low,
    },
  ],
  tokens: [],
  errors: [],
};
