import { AccountDetail, ApprovalRiskLevel } from '../types/approvalsApi';

// isDashboard is a security check to ensure the user is interacting with the snap from the official
// Wallet Guard Dashboard
export const isDashboard = (url: string): boolean => {
  const regex = /^https:\/\/dashboard\.walletguard\.app(\/.*)?$/u;

  return regex.test(url);
};

// Adds commas, $ sign, and formats the decimals according to input. Only supports USD for now
export const formatFiatValue = (
  fiatValue: string,
  minDecimals: number,
  maxDecimals: number,
): string => {
  const fiatValueFormatted = Number(fiatValue).toLocaleString('en-US', {
    minimumFractionDigits: minDecimals,
    maximumFractionDigits: maxDecimals,
  });
  return `$${fiatValueFormatted}`;
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

  let outputWarning = `You have ${highRiskApprovalsLength} open ${approvals} with ${formatFiatValue(
    accountDetails.totalAssetsAtRisk,
    0,
    0,
  )} at risk`;

  // Remove the count of approvals if it is too many characters
  if (outputWarning.length > 49) {
    outputWarning = `You have open ${approvals} with ${formatFiatValue(
      accountDetails.totalAssetsAtRisk,
      0,
      0,
    )} at risk`;
  }

  // if it is still above 49 characters,
  if (outputWarning.length > 49) {
    outputWarning = 'Significant open approvals detected, revoke now.';
  }

  return outputWarning;
};
