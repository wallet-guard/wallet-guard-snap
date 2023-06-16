import { OnTransactionResponse } from '@metamask/snaps-types';
import { heading, panel, text } from '@metamask/snaps-ui';

export const RevertComponent = (): OnTransactionResponse => {
  return {
    content: panel([
      heading('Revert warning'),
      text(
        'The transaction will be reverted and your gas fee will go to waste.',
      ),
    ]),
  };
};
