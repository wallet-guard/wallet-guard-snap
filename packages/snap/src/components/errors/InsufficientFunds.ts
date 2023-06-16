import { OnTransactionResponse } from '@metamask/snaps-types';
import { heading, panel } from '@metamask/snaps-ui';

export const InsufficientFundsComponent = (): OnTransactionResponse => {
  return {
    content: panel([heading('Insufficient funds')]),
  };
};
