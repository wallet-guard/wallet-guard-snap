import { OnTransactionResponse } from '@metamask/snaps-types';
import { heading, panel, text } from '@metamask/snaps-ui';

export const UnauthorizedComponent = (): OnTransactionResponse => {
  return {
    content: panel([
      heading('Unauthorized'),
      text(
        'Please contact support@walletguard.app if you continue seeing this issue.',
      ),
    ]),
  };
};
