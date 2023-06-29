import { Panel } from '@metamask/snaps-ui';
import { ErrorType } from '../../types/simulateApi';
import {
  ErrorComponent,
  RevertComponent,
  TooManyRequestsComponent,
  UnauthorizedComponent,
  InsufficientFundsComponent,
} from '.';

/**
 * Maps an error from the Wallet Guard API to a component.
 *
 * @param errorType - The mapped error response based on status code or any simulation related issues.
 * @returns Panel - the output for OnTransaction hook.
 */
export function showErrorComponent(errorType: ErrorType): Panel {
  switch (errorType) {
    case ErrorType.Revert:
      return RevertComponent();
    case ErrorType.InsufficientFunds:
      return InsufficientFundsComponent();
    case ErrorType.TooManyRequests:
      return TooManyRequestsComponent();
    case ErrorType.Unauthorized:
      return UnauthorizedComponent();
    default:
      return ErrorComponent();
  }
}
