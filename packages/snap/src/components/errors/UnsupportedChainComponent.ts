import { panel, heading, text, Panel } from '@metamask/snaps-ui';

export const UnsupportedChainComponent = (): Panel => {
  return panel([
    heading('Unsupported chain'),
    text(
      'We will be adding support for more chains very soon. Head to our Discord to suggest which one we support next!',
    ),
  ]);
};
