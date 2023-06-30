/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { installSnap } from '@metamask/snaps-jest';
// eslint-disable-next-line import/no-extraneous-dependencies
import { expect } from '@jest/globals';
import { heading, panel, text } from '@metamask/snaps-ui';
import { ChainId } from './types/chains';
import { EthereumMainnetMockSuccessResponse } from './mocks/MockEthereumResponses';

describe('onTransaction', () => {
  describe('supported chains uis', () => {
    it('should display unsupported chain UI for unknown chain ID', async () => {
      const snap = await installSnap();

      const response = await snap.sendTransaction({
        chainId: 'eip155:10',
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

    it('should display transaction simulations for ETH Mainnet', async () => {
      const snap = await installSnap();

      const { unmock } = await snap.mock({
        url: 'https://api.walletguard.app/snaps/v0/eth/mainnet/transaction',
        response: {
          status: 200,
          body: JSON.stringify(EthereumMainnetMockSuccessResponse),
        },
      });

      const response = await snap.sendTransaction({
        chainId: ChainId.EthereumMainnet,
      });

      const expected = panel([
        // SimulationOverviewComponent Response
        panel([]),

        // AssetChangeComponent - Transfer
        panel([heading('You will send:'), text('0.01 ETH ($19.28)')]),

        // AssetChangeComponent - Receive
        panel([heading('You will receive:'), text('19.276096 USDC ($19.28)')]),

        // TODO: GasComponent

        // AdditionalWarningsComponent
        panel([]),
      ]);

      console.log(response);
      expect(response).toRender(expected);
      unmock();
    });
  });
});
