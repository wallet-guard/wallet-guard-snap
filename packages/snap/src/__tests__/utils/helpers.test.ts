import { isDashboard, formatFiatValue } from '../../utils/helpers';

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
