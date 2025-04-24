import { Panel, copyable, heading, panel, text } from '@metamask/snaps-ui';

export const SunsetComponent = (): Panel => {
  return panel([
    heading('Sunset notice'),
    text(
      `The Wallet Guard Snap has been sunset and is no longer supported. Features of Wallet Guard are now available directly within MetaMask. Please review the article below for details.`,
    ),
    copyable('https://www.walletguard.app/blog/wallet-guard-sunset-notice'),
  ]);
};
