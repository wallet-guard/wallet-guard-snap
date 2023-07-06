import { AccountDetail, ApprovalRiskLevel } from '../types/approvalsApi';

export const isDashboard = (url: string): boolean => {
  const regex = /^https:\/\/dashboard\.walletguard\.app(\/.*)?$/u;

  return regex.test(url);
};

// Adds commas and removes any decimal places
export const formatFiatValue = (fiatValue: string): string => {
  return Number(fiatValue).toLocaleString('en-US', {
    maximumFractionDigits: 0,
  });
};

// generateApprovalsMessage creates the message to be displayed in snap_notify. It asserts
// that the message must be < 50 characters.
export const generateApprovalsMessage = (
  accountDetails: AccountDetail,
): string => {
  const highRiskApprovalsLength = accountDetails.approvals.filter(
    (approval) => approval.riskLevel === ApprovalRiskLevel.High,
  ).length;

  if (highRiskApprovalsLength === 0) {
    return '';
  }

  const approvals = highRiskApprovalsLength === 1 ? 'approval' : 'approvals';

  let outputWarning = `You have ${highRiskApprovalsLength} open ${approvals} with $${formatFiatValue(
    accountDetails.totalAssetsAtRisk,
  )} at risk`;

  // Remove the count of approvals if it is too many characters
  if (outputWarning.length > 49) {
    outputWarning = `You have open ${approvals} with $${formatFiatValue(
      accountDetails.totalAssetsAtRisk,
    )} at risk`;
  }

  // if it is still above 49 characters,
  if (outputWarning.length > 49) {
    outputWarning = 'Significant open approvals detected, revoke now.';
  }

  return outputWarning;
};

export const formatToEightDecimals = (inputString: string): string => {
  const numberValue = parseFloat(inputString);

  if (isNaN(numberValue)) {
    return '0';
  }

  return Number(numberValue.toFixed(8)).toString();
};
