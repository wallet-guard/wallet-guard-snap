import { expect } from '@jest/globals';
import { installSnap } from '@metamask/snaps-jest';

import { heading, panel, text } from '@metamask/snaps-ui';
import { ChainId } from './types/chains';
import { UnsupportedChainComponent } from './components';


describe('onTransaction', () => {
  describe('supported chains uis', async () => {
    it('should display unsupported chain UI for unknown chain ID', async () => {
      const snap = await installSnap();

      const response = await snap.sendTransaction({
        chainId: '0x123',
      });

      const expected = panel([
        heading('Unsupported chain'),
        text(
          'We will be adding support for more chains very soon. Head to our Discord to suggest which one we support next!',
        ),
      ]);

      expect(response).toRender(expected);
      await snap.close();
    });

    // snap.sendTransaction({
    //   chainId: ChainId.EthereumMainnet,

    // })

    // snap.mock

  });
});
