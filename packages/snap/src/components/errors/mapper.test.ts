import { ErrorType } from '../../types/simulateApi';
import { ErrorComponent } from './ErrorComponent';
import { InsufficientFundsComponent } from './InsufficientFundsComponent';
import { RevertComponent } from './RevertComponent';
import { TooManyRequestsComponent } from './TooManyRequestsComponent';
import { UnauthorizedComponent } from './UnauthorizedComponent';
import { showErrorComponent } from './mapper';

describe('showErrorComponent', () => {
  it('should map the revert error correctly', () => {
    const result = showErrorComponent(ErrorType.Revert);
    expect(result).toStrictEqual(RevertComponent());
  });

  it('should map the insufficient funds error correctly', () => {
    const result = showErrorComponent(ErrorType.InsufficientFunds);
    expect(result).toStrictEqual(InsufficientFundsComponent());
  });

  it('should map the too many requests error correctly', () => {
    const result = showErrorComponent(ErrorType.TooManyRequests);
    expect(result).toStrictEqual(TooManyRequestsComponent());
  });

  it('should map the unauthorized error correctly', () => {
    const result = showErrorComponent(ErrorType.Unauthorized);
    expect(result).toStrictEqual(UnauthorizedComponent());
  });

  it('should map 4XX (such as timeouts) errors correctly', () => {
    const result = showErrorComponent(ErrorType.GeneralError);
    expect(result).toStrictEqual(ErrorComponent());
  });

  it('should map gas errors correctly', () => {
    const result = showErrorComponent(
      ErrorType.MaxFeePerGasLessThanBlockBaseFee,
    );
    expect(result).toStrictEqual(ErrorComponent());
  });

  it('should map unknown errors correctly', () => {
    const result = showErrorComponent(ErrorType.UnknownError);
    expect(result).toStrictEqual(ErrorComponent());
  });
});
