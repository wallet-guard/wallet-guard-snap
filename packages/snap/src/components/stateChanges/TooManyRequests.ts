import { OnTransactionResponse } from '@metamask/snaps-types';
import { heading, panel, text } from '@metamask/snaps-ui';

export const TooManyRequestsComponent = (): OnTransactionResponse => {
  return {
    content: panel([
      heading('Slow down'),
      text(
        "We've detected too many requests from you. Please try again later.",
      ),
    ]),
  };
};
