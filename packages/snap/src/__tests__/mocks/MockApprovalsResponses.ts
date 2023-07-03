import {
  ApprovalChangeType,
  ApprovalReponse,
  ApprovalRiskLevel,
  ERCType,
} from '../../types/approvalsApi';
import { ChainId } from '../../types/chains';

export const ApprovalsWithOneHighRiskWarning: ApprovalReponse = {
  address: '0x123',
  approvals: [
    {
      chainId: ChainId.EthereumMainnet,
      contractAddress: '0x11111',
      approvedAddress: '0x99999',
      tokenID: '5555',
      ercType: ERCType.ERC1155,
      approvalType: ApprovalChangeType.Approval,
      amount: '1',
      riskLevel: ApprovalRiskLevel.High,
    },
  ],
  tokens: [],
  errors: [],
};
