import { Panel, heading, panel, text } from '@metamask/snaps-ui';

export const RevertComponent = (): Panel => {
  return panel([
    heading('Revert warning'),
    text('The transaction will be reverted and your gas fee will go to waste.'),
  ]);
};
