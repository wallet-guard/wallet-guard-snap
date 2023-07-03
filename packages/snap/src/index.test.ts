/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { installSnap } from '@metamask/snaps-jest';
// eslint-disable-next-line import/no-extraneous-dependencies
import { expect } from '@jest/globals';
import { panel } from '@metamask/snaps-ui';
import { ChainId } from './types/chains';
import {
  ArbitrumSuccessTokenSwap,
  EthereumMainnetMockErrorResponse,
  EthereumMainnetMockResponseShouldBlock,
  EthereumMainnetMockResponseWithWarnings,
  EthereumMainnetMockRevertTransaction,
  EthereumMainnetMockSuccessResponse,
  PolygonSuccessMultiple1155OpenSea,
} from './mocks';
import {
  ErrorComponent,
  RevertComponent,
  RiskFactorsComponent,
  SimulationOverviewComponent,
  StateChangesComponent,
  UnsupportedChainComponent,
} from './components';

describe('onTransaction', () => {
  describe('onTransaction supported chains', () => {
    it('should display unsupported chain UI for unknown chain ID', async () => {
      const snap = await installSnap();

      const response = await snap.sendTransaction({
        chainId: 'eip155:10',
      });

      const expected = UnsupportedChainComponent();

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
          contentType: 'application/json',
        },
      });

      const response = await snap.sendTransaction({
        chainId: ChainId.EthereumMainnet,
      });

      const {
        overviewMessage,
        recommendedAction,
        stateChanges,
        gas,
        riskFactors,
      } = EthereumMainnetMockSuccessResponse;

      const expected = panel([
        SimulationOverviewComponent(overviewMessage, recommendedAction),
        StateChangesComponent(stateChanges, gas),
        RiskFactorsComponent(riskFactors || []),
      ]);

      expect(response).toRender(expected);
      unmock();
    });

    it('should display transaction simulations for Polygon Mainnet', async () => {
      const snap = await installSnap();

      const { unmock } = await snap.mock({
        url: 'https://api.walletguard.app/snaps/v0/polygon/mainnet/transaction',
        response: {
          status: 200,
          body: JSON.stringify(PolygonSuccessMultiple1155OpenSea),
          contentType: 'application/json',
        },
      });

      const response = await snap.sendTransaction({
        chainId: ChainId.PolygonMainnet,
      });

      const {
        overviewMessage,
        recommendedAction,
        stateChanges,
        gas,
        riskFactors,
      } = PolygonSuccessMultiple1155OpenSea;

      const expected = panel([
        SimulationOverviewComponent(overviewMessage, recommendedAction),
        StateChangesComponent(stateChanges, gas),
        RiskFactorsComponent(riskFactors || []),
      ]);

      expect(response).toRender(expected);
      unmock();
    });

    it('should display transaction simulations for Arbitrum Mainnet', async () => {
      const snap = await installSnap();

      const { unmock } = await snap.mock({
        url: 'https://api.walletguard.app/snaps/v0/arb/mainnet/transaction',
        response: {
          status: 200,
          body: JSON.stringify(ArbitrumSuccessTokenSwap),
          contentType: 'application/json',
        },
      });

      const response = await snap.sendTransaction({
        chainId: ChainId.ArbitrumMainnet,
      });

      const {
        overviewMessage,
        recommendedAction,
        stateChanges,
        gas,
        riskFactors,
      } = ArbitrumSuccessTokenSwap;

      const expected = panel([
        SimulationOverviewComponent(overviewMessage, recommendedAction),
        StateChangesComponent(stateChanges, gas),
        RiskFactorsComponent(riskFactors || []),
      ]);

      expect(response).toRender(expected);
      unmock();
    });
  });

  describe('onTransaction handles transactions with warnings', () => {
    it('should display transactions with recommended action block', async () => {
      const snap = await installSnap();

      const { unmock } = await snap.mock({
        url: 'https://api.walletguard.app/snaps/v0/eth/mainnet/transaction',
        response: {
          status: 200,
          body: JSON.stringify(EthereumMainnetMockResponseShouldBlock),
          contentType: 'application/json',
        },
      });

      const response = await snap.sendTransaction({
        chainId: ChainId.EthereumMainnet,
      });

      const {
        overviewMessage,
        recommendedAction,
        stateChanges,
        gas,
        riskFactors,
      } = EthereumMainnetMockResponseShouldBlock;

      const expected = panel([
        SimulationOverviewComponent(overviewMessage, recommendedAction),
        StateChangesComponent(stateChanges, gas),
        RiskFactorsComponent(riskFactors || []),
      ]);

      expect(response).toRender(expected);
      unmock();
    });

    it('should display transactions with recommended action warn', async () => {
      const snap = await installSnap();

      const { unmock } = await snap.mock({
        url: 'https://api.walletguard.app/snaps/v0/eth/mainnet/transaction',
        response: {
          status: 200,
          body: JSON.stringify(EthereumMainnetMockResponseWithWarnings),
          contentType: 'application/json',
        },
      });

      const response = await snap.sendTransaction({
        chainId: ChainId.EthereumMainnet,
      });

      const {
        overviewMessage,
        recommendedAction,
        stateChanges,
        gas,
        riskFactors,
      } = EthereumMainnetMockResponseWithWarnings;

      const expected = panel([
        SimulationOverviewComponent(overviewMessage, recommendedAction),
        StateChangesComponent(stateChanges, gas),
        RiskFactorsComponent(riskFactors || []),
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
          contentType: 'application/json',
        },
      });

      const response = await snap.sendTransaction({
        chainId: ChainId.EthereumMainnet,
      });

      const expected = ErrorComponent();

      expect(response).toRender(expected);
      unmock();
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

      const expected = RevertComponent();

      expect(response).toRender(expected);
      unmock();
    });

    // TODO: This appears to be a bug with this testing library
    // https://github.com/MetaMask/snaps/discussions/1543
    // eslint-disable-next-line jest/no-commented-out-tests
    //     it('should handle 403 unauthorized from API', async () => {
    //       const snap = await installSnap();

    //       const { unmock } = await snap.mock({
    //         url: 'https://api.walletguard.app/snaps/v0/eth/mainnet/transaction',
    //         response: {
    //           status: 403,
    //           body: 'Forbidden',
    //         },
    //       });

    //       const response = await snap.sendTransaction({
    //         chainId: ChainId.EthereumMainnet,
    //       });

    //       const expected = UnauthorizedComponent();

    //       expect(response).toRender(expected);
    //       unmock();
    //     });
  });
});

describe('onRpcRequest', () => {
  // TODO
});

describe('onCronJob', () => {
  // TODO
});
