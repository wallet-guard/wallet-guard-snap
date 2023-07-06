import { ApprovalNotification } from '../../types/approvalsApi';

export const ApprovalsWithHighRiskWarnings: ApprovalNotification = {
  openApprovals: 123,
  highRiskApprovals: 14,
  fiatValueAtRisk: '123112',
  currency: 'USD',
};

export const ApprovalsWithZeroHighRiskWarning: ApprovalNotification = {
  openApprovals: 3,
  highRiskApprovals: 0,
  fiatValueAtRisk: '0',
  currency: 'USD',
};
