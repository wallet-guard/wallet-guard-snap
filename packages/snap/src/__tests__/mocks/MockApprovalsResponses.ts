import {
  ApprovalChangeType,
  AccountDetail,
  ApprovalRiskLevel,
  ERCType,
} from '../../types/approvalsApi';
import { ChainId } from '../../types/chains';

export const ApprovalsWithOneHighRiskWarning: AccountDetail = {
  totalAssets: '10000',
  totalAssetsAtRisk: '500',
  address: '0x123',
  approvals: [
    {
      chainId: ChainId.EthereumMainnet,
      contractAddress: '0x11111',
      approvedAddress: '0x99999',
      ercType: ERCType.ERC1155,
      approvalType: ApprovalChangeType.Approval,
      tokens: {
        tokenID: '5555',
        fiatValue: '500',
        amount: '1',
        name: 'some NFT',
        symbol: '',
        logo: '',
      },
      allowance: '1',
      riskLevel: ApprovalRiskLevel.High,
    },
  ],
  tokens: [],
  errors: [],
};

export const ApprovalsWithZeroHighRiskWarning: AccountDetail = {
  totalAssets: '10000',
  totalAssetsAtRisk: '0',
  address: '0x123',
  approvals: [
    {
      chainId: ChainId.EthereumMainnet,
      contractAddress: '0x11111',
      approvedAddress: '0x99999',
      ercType: ERCType.ERC1155,
      approvalType: ApprovalChangeType.Approval,
      tokens: {
        tokenID: '5555',
        fiatValue: '0',
        amount: '1',
        name: 'some worthless NFT',
        symbol: '',
        logo: '',
      },
      allowance: '1',
      riskLevel: ApprovalRiskLevel.Low,
    },
  ],
  tokens: [],
  errors: [],
};
