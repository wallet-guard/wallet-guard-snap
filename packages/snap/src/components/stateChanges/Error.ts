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

// TODO: consider this as an alternate component model. then wrap these in a component() wrapper that adds `return { content: input }` to it
// export const ErrorComp = panel([
//   heading('Error while simulating transaction'),
//   text(
//     'Please contact support@walletguard.app if you continue seeing this issue.',
//   ),
// ]);
