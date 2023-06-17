import { OnTransactionResponse } from '@metamask/snaps-types';
import { panel, heading, text } from '@metamask/snaps-ui';

export const UnsupportedChainComponent = (): OnTransactionResponse => {
  return {
    content: panel([
      heading('Unsupported chain'),
      text(
        'We will be adding support for more chains very soon. Head to our Discord to suggest which one we support next!',
      ),
    ]),
  };
};
