import { installSnap } from '@metamask/snaps-jest';
import { UnsupportedChainComponent } from './components';

describe('onTransaction', () => {
  describe('supported chains uis', () => {
    it('should display unsupported chain UI for unknown chain ID', async () => {
      const snap = await installSnap();

      const response = await snap.sendTransaction({
        chainId: 'eip155:10',
      });

      const expected = UnsupportedChainComponent();

      expect(response).toRender(expected);
      await snap.close();
    });
  });
});
