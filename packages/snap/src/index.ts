import { OnTransactionHandler, OnTransactionResponse } from '@metamask/snaps-types';
import { Panel, divider, heading, panel, text } from '@metamask/snaps-ui';
import { fetchTransaction } from './fetchTransaction';
import { StateChangeComponent } from './components/StateChangeComponent';
import { ErrorType, SimulationWarningType } from './types/simulateApi';
import {
  InsufficientFundsComponent,
  UnauthorizedComponent,
} from './components/stateChanges';

// Handle outgoing transactions.
export const onTransaction: OnTransactionHandler = async ({
  transaction,
  chainId,
  transactionOrigin,
}) => {
  const response = await fetchTransaction(
    transaction,
    chainId,
    transactionOrigin,
  );

  if (response.error) {
    return getErrorComponent(response.error.type);
  } else if (response.simulation?.error) {
    // todo;
    return null;
  }


  if (!response.simulation) {
    return {
      // todo change this to unknown error component
      content: panel([text('Unknown response')]),
    };
  }

  if (
    response.simulation.warningType === SimulationWarningType.Info ||
    response.simulation.warningType === SimulationWarningType.Warn
  ) {
    return {
      content: panel([
        heading('Overview Message'),
        text(response.simulation.message?.join(' ') || ''),
        divider(),
        ...StateChangeComponent(response.simulation.stateChanges),
      ]),
    };
  }

  return {
    content: panel(StateChangeComponent(response.simulation.stateChanges)),
  };
};

function getErrorComponent(errorType: ErrorType): OnTransactionResponse {
  switch (errorType) {
    case ErrorType.Revert:
      return null;
    case ErrorType.InsufficientFunds:
      return InsufficientFundsComponent();
    case ErrorType.GeneralError:
      return null;
    case ErrorType.TooManyRequests:
      return null;
    case ErrorType.Unauthorized:
      return component(UnauthorizedComponent);
    case ErrorType.MaxFeePerGasLessThanBlockBaseFee:
      return null;
    case ErrorType.UnknownError:
      return null;
    default:
      return null;
  }
}
