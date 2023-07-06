import { ApprovalNotification } from '../types/approvalsApi';

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

// generateApprovalsMessage creates the message to be displayed in snap_notify. It ensures
// that the message must be < 50 characters.
export const generateApprovalsMessage = (
  accountDetails: ApprovalNotification,
): string => {
  if (!accountDetails.fiatValueAtRisk || !accountDetails.highRiskApprovals) {
    return '';
  }

  if (
    accountDetails.fiatValueAtRisk === '0' &&
    accountDetails.highRiskApprovals > 0
  ) {
    return 'You have high risk approvals, revoke now.';
  }

  const { highRiskApprovals } = accountDetails;
  const approvals = highRiskApprovals === 1 ? 'approval' : 'approvals';

  let outputWarning = `You have ${highRiskApprovals} open ${approvals} with ${formatFiatValue(
    accountDetails.fiatValueAtRisk,
    0,
    0,
  )} at risk`;

  // Remove the count of approvals if it is too many characters
  if (outputWarning.length > 49) {
    outputWarning = `You have open approvals with ${formatFiatValue(
      accountDetails.fiatValueAtRisk,
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
