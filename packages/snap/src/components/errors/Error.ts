import { OnTransactionResponse } from '@metamask/snaps-types';
import { heading, panel, text } from '@metamask/snaps-ui';

export const ErrorComponent = (): OnTransactionResponse => {
  return {
    content: panel([
      heading('Error while simulating transaction'),
      text(
        'Please contact support@walletguard.app if you continue seeing this issue.',
      ),
    ]),
  };
};
