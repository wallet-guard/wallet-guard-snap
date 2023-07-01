/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { installSnap } from '@metamask/snaps-jest';
// eslint-disable-next-line import/no-extraneous-dependencies
import { expect } from '@jest/globals';
import { divider, heading, panel, text } from '@metamask/snaps-ui';
import { ChainId } from './types/chains';
import {
  EthereumMainnetMockErrorResponse,
  EthereumMainnetMockResponseWithWarnings,
  EthereumMainnetMockRevertTransaction,
  EthereumMainnetMockSuccessResponse,
} from './mocks/MockEthereumResponses';

describe('onTransaction', () => {
  describe('onTransaction supported chains', () => {
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

      expect(response).toRender(expected);
      unmock();
    });

    it('should display transactions with warnings', async () => {
      const snap = await installSnap();

      const { unmock } = await snap.mock({
        url: 'https://api.walletguard.app/snaps/v0/eth/mainnet/transaction',
        response: {
          status: 200,
          body: JSON.stringify(EthereumMainnetMockResponseWithWarnings),
        },
      });

      const response = await snap.sendTransaction({
        chainId: ChainId.EthereumMainnet,
      });

      const expected = panel([
        // SimulationOverviewComponent Response
        panel([
          heading('🚨 Warning'),
          text(
            EthereumMainnetMockResponseWithWarnings.simulation!.overviewMessage,
          ),
          divider(),
        ]),

        // AssetChangeComponent - Transfer
        panel([heading('You will send:'), text('0.1 ETH ($200.00)')]),

        // TODO: GasComponent

        // AdditionalWarningsComponent
        panel([
          heading('Additional Warnings'),
          text('Domain identified as a wallet drainer.'),
          text('This domain was recently created'),
        ]),
      ]);

      expect(response).toRender(expected);
      unmock();
    });
  });

  describe('onTransaction handles errors', () => {
    it('should handle 400 bad request from API', async () => {
      const snap = await installSnap();

      const { unmock } = await snap.mock({
        url: 'https://api.walletguard.app/snaps/v0/eth/mainnet/transaction',
        response: {
          status: 400,
          body: JSON.stringify(EthereumMainnetMockErrorResponse),
        },
      });

      const response = await snap.sendTransaction({
        chainId: ChainId.EthereumMainnet,
      });

      const expected = panel([
        heading('Error while simulating transaction'),
        text(
          'Please contact support@walletguard.app if you continue seeing this issue.',
        ),
      ]);

      expect(response).toRender(expected);
      unmock();
    });
  });

  it('should handle reverted transactions', async () => {
    const snap = await installSnap();

    const { unmock } = await snap.mock({
      url: 'https://api.walletguard.app/snaps/v0/eth/mainnet/transaction',
      response: {
        status: 200,
        body: JSON.stringify(EthereumMainnetMockRevertTransaction),
      },
    });

    const response = await snap.sendTransaction({
      chainId: ChainId.EthereumMainnet,
    });

    const expected = panel([
      heading('Revert warning'),
      text(
        'The transaction will be reverted and your gas fee will go to waste.',
      ),
    ]);

    expect(response).toRender(expected);
    unmock();
  });

  it('should handle 403 unauthorized from API', async () => {
    const snap = await installSnap();

    const { unmock } = await snap.mock({
      url: 'https://api.walletguard.app/snaps/v0/eth/mainnet/transaction',
      response: {
        status: 403,
      },
    });

    const response = await snap.sendTransaction({
      chainId: ChainId.EthereumMainnet,
    });

    const expected = panel([
      heading('Unauthorized'),
      text(
        'Please contact support@walletguard.app if you continue seeing this issue.',
      ),
    ]);

    expect(response).toRender(expected);
    unmock();
  });
});
