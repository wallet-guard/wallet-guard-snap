import { ApprovalNotification } from '../types/approvalsApi';

// isDashboard is a security check to ensure the user is interacting with the snap from the official
// Wallet Guard Dashboard
export const isDashboard = (url: string): boolean => {
  const regex = /^https:\/\/dashboard\.walletguard\.app(\/.*)?$/u;

  return regex.test(url);
};

export const numberWithCommas = (x: string): string => {
  return x.replace(/\B(?=(\d{3})+(?!\d))/gu, ',');
};

export const isValidEthereumAddress = (address: string): boolean => {
  return /^0x[0-9a-f]{40}$/iu.test(address);
};

// Adds commas, $ sign, and formats the decimals according to input. Only supports USD for now
export const formatFiatValue = (
  fiatValue: string,
  maxDecimals: number,
): string => {
  const fiatWithRoundedDecimals = Number(fiatValue)
    .toFixed(maxDecimals) // round to maxDecimals
    .replace(/\.00$/u, ''); // removes 00 if it exists

  const fiatWithCommas = numberWithCommas(fiatWithRoundedDecimals); // add commas
  return `$${fiatWithCommas}`;
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
  )} at risk`;

  // Remove the count of approvals if it is too many characters
  if (outputWarning.length > 49) {
    outputWarning = `You have open approvals with ${formatFiatValue(
      accountDetails.fiatValueAtRisk,
      0,
    )} at risk`;
  }

  // if it is still above 49 characters,
  if (outputWarning.length > 49) {
    outputWarning = 'Significant open approvals detected, revoke now.';
  }

  return outputWarning;
};
