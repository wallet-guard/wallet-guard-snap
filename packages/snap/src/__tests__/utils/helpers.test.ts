import { isDashboard, formatToEightDecimals } from '../../utils/helpers';

describe('formatToEightDecimals', () => {
  it('should format decimals correctly', () => {
    let result = formatToEightDecimals('1.2');
    expect(result).toBe('1.2');

    result = formatToEightDecimals('1.20000');
    expect(result).toBe('1.2');

    result = formatToEightDecimals('1.234567899');
    expect(result).toBe('1.23456789');

    result = formatToEightDecimals('100.234567899');
    expect(result).toBe('100.23456789');

    result = formatToEightDecimals('0.0001');
    expect(result).toBe('0.0001');

    result = formatToEightDecimals('0.000000001');
    expect(result).toBe('0');

    result = formatToEightDecimals('0.00000007');
    expect(result).toBe('0.00000007');

    result = formatToEightDecimals('not a number');
    expect(result).toBe('0');

    result = formatToEightDecimals('88.255203583732512952');
    expect(result).toBe('88.25520358');

    result = formatToEightDecimals('0.04596345904438865');
    expect(result).toBe('0.04596345');

    result = formatToEightDecimals('1.00000');
    expect(result).toBe('1');

    result = formatToEightDecimals('1');
    expect(result).toBe('1');

    result = formatToEightDecimals('0');
    expect(result).toBe('0');
  });
});

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
