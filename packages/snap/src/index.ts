import {
  OnTransactionHandler,
  OnTransactionResponse,
} from '@metamask/snaps-types';
import { panel } from '@metamask/snaps-ui';
import { fetchTransaction } from './fetchTransaction';
import { StateChangesComponent } from './components/StateChangesComponent';
import { ErrorType, SimulationWarningType } from './types/simulateApi';
import {
  ErrorComponent,
  InsufficientFundsComponent,
  RevertComponent,
  TooManyRequestsComponent,
  UnauthorizedComponent,
} from './components/errors';
import { SimulationOverview } from './components/SimulationOverview';
import { SUPPORTED_CHAINS } from './config';
import { ChainId } from './types/chains';
import { UnsupportedChainComponent } from './components/errors/UnsupportedChain';

// Handle outgoing transactions.
export const onTransaction: OnTransactionHandler = async ({
  transaction,
  chainId,
  transactionOrigin,
}) => {
  if (!SUPPORTED_CHAINS.includes(chainId as ChainId)) {
    return UnsupportedChainComponent();
  }

  const response = await fetchTransaction(
    transaction,
    chainId,
    transactionOrigin,
  );

  if (response.error) {
    return showErrorResponse(response.error.type);
  } else if (!response.simulation || response.simulation?.error) {
    return showErrorResponse(ErrorType.GeneralError);
  }

  if (
    response.simulation.warningType === SimulationWarningType.Info ||
    response.simulation.warningType === SimulationWarningType.Warn
  ) {
    return {
      content: panel([
        SimulationOverview(response.simulation.message),
        StateChangesComponent(response.simulation.stateChanges),
      ]),
    };
  }

  return {
    content: StateChangesComponent(response.simulation.stateChanges),
  };
};

/**
 * Maps an error from the Wallet Guard API to a component.
 *
 * @param errorType - The mapped error response based on status code or any simulation related issues.
 * @returns OnTransactionResposnse - the output for OnTransaction hook.
 */
function showErrorResponse(errorType: ErrorType): OnTransactionResponse {
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
