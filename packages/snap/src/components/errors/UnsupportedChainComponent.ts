import { panel, heading, text, Panel } from '@metamask/snaps-ui';

export const UnsupportedChainComponent = (): Panel => {
  return panel([
    heading('More chains coming soon'),
    text(
      'Currently Wallet Guard supports ETH, Polygon, Optimism, Arbitrum, Optimism, and Base with more chains being added soon. In the meanwhile review this transaction in the Details tab.',
    ),
  ]);
};
