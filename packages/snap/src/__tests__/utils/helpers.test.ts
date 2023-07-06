import { Currency } from '../../types/simulateApi';
import {
  isDashboard,
  formatFiatValue,
  generateApprovalsMessage,
} from '../../utils/helpers';

describe('isDashboard', () => {
  it('should return valid for https://dashboard.walletguard.app', () => {
    const result = isDashboard('https://dashboard.walletguard.app');
    expect(result).toBe(true);
  });

  it('should return valid for https://dashboard.walletguard.app/', () => {
    const result = isDashboard('https://dashboard.walletguard.app/');
    expect(result).toBe(true);
  });

  it('should return valid for https://dashboard.walletguard.app/somepath', () => {
    const result = isDashboard('https://dashboard.walletguard.app/somepath');
    expect(result).toBe(true);
  });

  it('should return valid for https://dashboard.walletguard.app/0x1234567', () => {
    const result = isDashboard('https://dashboard.walletguard.app/0x1234567');
    expect(result).toBe(true);
  });

  it('should return invalid for https://notdashboard.walletguard.app', () => {
    const result = isDashboard('https://notdashboard.walletguard.app');
    expect(result).toBe(false);
  });

  it('should return invalid for https://dashboard.walletguard.app.somescamsite.xyz', () => {
    const result = isDashboard(
      'https://dashboard.walletguard.app.somescamsite.xyz',
    );
    expect(result).toBe(false);
  });
});

describe('formatFiatValue', () => {
  it('should format whole number fiat values correctly', () => {
    const result = formatFiatValue('123456', 0, 2);
    expect(result).toBe('$123,456');
  });

  it('should format whole number fiat values correctly 7 figures', () => {
    const result = formatFiatValue('1234567', 0, 2);
    expect(result).toBe('$1,234,567');
  });

  it('should format decimal  fiat values correctly', () => {
    const result = formatFiatValue('1234.56', 2, 2);
    expect(result).toBe('$1,234.56');
  });

  it('should format fiat values with 0 decimals intended', () => {
    const result = formatFiatValue('87125.51', 0, 0);
    expect(result).toBe('$87,126');
  });
});

describe('generateApprovalsMessage', () => {
  it('should correctly generate a message when the length of the message is less than 50 characters', () => {
    const result = generateApprovalsMessage({
      openApprovals: 1,
      highRiskApprovals: 1,
      fiatValueAtRisk: '1000',
      currency: Currency.USD,
    });

    expect(result).toBe('You have 1 open approval with $1,000 at risk');
  });

  it('should remove the count of approvals when the length of the message is greater than 49 characters', () => {
    const result = generateApprovalsMessage({
      openApprovals: 1,
      highRiskApprovals: 11,
      fiatValueAtRisk: '1000000',
      currency: Currency.USD,
    });

    expect(result).toBe('You have open approvals with $1,000,000 at risk');
  });

  it('should replace the message with "Significant open approvals detected, revoke now." when the length of the message is still greater than 49 characters', () => {
    const result = generateApprovalsMessage({
      openApprovals: 1,
      highRiskApprovals: 1,
      fiatValueAtRisk: '1000000000000000000',
      currency: Currency.USD,
    });

    expect(result).toBe('Significant open approvals detected, revoke now.');
  });

  it('should use plural form "approvals" when highRiskApprovals is more than 1', () => {
    const result = generateApprovalsMessage({
      openApprovals: 1,
      highRiskApprovals: 2,
      fiatValueAtRisk: '1000',
      currency: Currency.USD,
    });

    expect(result).toBe('You have 2 open approvals with $1,000 at risk');
  });

  // TODO: Fix this test
  // it('should return an empty string when fiatValueAtRisk or highRiskApprovals is zero', () => {
  //   let result = generateApprovalsMessage({
  //     openApprovals: 1,
  //     highRiskApprovals: 0,
  //     fiatValueAtRisk: '1000',
  //     currency: Currency.USD,
  //   });

  //   expect(result).toBe('');

  //   result = generateApprovalsMessage({
  //     openApprovals: 1,
  //     highRiskApprovals: 1,
  //     fiatValueAtRisk: '0',
  //     currency: Currency.USD,
  //   });

  //   expect(result).toBe('');
  // });
});
