import { Panel, heading, panel, text } from '@metamask/snaps-ui';

export const UnauthorizedComponent = (): Panel => {
  return panel([
    heading('Unauthorized'),
    text(
      `Please contact support@walletguard.app if you continue seeing this issue. In the meanwhile review the transaction in the Details tab.`,
    ),
  ]);
};
