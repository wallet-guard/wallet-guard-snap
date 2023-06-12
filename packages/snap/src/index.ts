import { OnTransactionHandler } from '@metamask/snaps-types';
import { divider, heading, panel, text } from '@metamask/snaps-ui';
import { fetchTransaction } from './fetchTransaction';
import { StateChangeComponent } from './components/stateChangeComponent';
import { SimulationWarningType, WarningType } from './types/simulateApi';

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

  // Handle transactions with errors.
  if (response.error) {
    return {
      content: panel([text('Error: ' + response.error.message)]),
    };
  }

  // Add warning if simulation warning is present.
  if (
    response.warningType === SimulationWarningType.Info ||
    response.warningType === SimulationWarningType.Warn
  ) {
    return {
      content: panel([
        heading('Overview Message'),
        text(response.message?.join(' ') || ''),
        divider(),
        ...StateChangeComponent(response.stateChanges),
      ]),
    };
  }

  return {
    content: panel(StateChangeComponent(response.stateChanges)),
  };
};
