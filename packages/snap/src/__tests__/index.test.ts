/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { NotificationType, installSnap } from '@metamask/snaps-jest';
import { expect } from '@jest/globals';
import { copyable, heading, panel, text } from '@metamask/snaps-ui';
import { assert } from '@metamask/utils';
import { ChainId } from '../types/chains';
import {
  ErrorComponent,
  InsufficientFundsComponent,
  RevertComponent,
  RiskFactorsComponent,
  SimulationOverviewComponent,
  StateChangesComponent,
  UnauthorizedComponent,
  UnsupportedChainComponent,
} from '../components';
import { CronJobMethods, RpcRequestMethods } from '../utils/config';
import {
  ApprovalsWithOneHighRiskWarning,
  ArbitrumSuccessTokenSwap,
  EthereumMainnetMockErrorResponse,
  EthereumMainnetMockInsufficientFunds,
  EthereumMainnetMockResponseShouldBlock,
  EthereumMainnetMockResponseWithWarnings,
  EthereumMainnetMockRevertTransaction,
  EthereumMainnetMockSuccessResponse,
  PolygonSuccessMultiple1155OpenSea,
} from './mocks';

describe('onTransaction', () => {
  describe('onTransaction supported chains', () => {
    it('should display unsupported chain UI for unknown chain ID', async () => {
      const snap = await installSnap();

      const response = await snap.sendTransaction({
        chainId: 'eip155:10',
      });

      const expected = UnsupportedChainComponent();

      expect(response).toRender(expected);
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

    it('should handle insufficient funds for transaction', async () => {
      const snap = await installSnap();

      const { unmock } = await snap.mock({
        url: 'https://api.walletguard.app/snaps/v0/eth/mainnet/transaction',
        response: {
          status: 200,
          body: JSON.stringify(EthereumMainnetMockInsufficientFunds),
        },
      });

      const response = await snap.sendTransaction({
        chainId: ChainId.EthereumMainnet,
      });

      const expected = InsufficientFundsComponent();

      expect(response).toRender(expected);
      unmock();
    });

    // TODO: This appears to be a bug with this testing library
    // https://github.com/MetaMask/snaps/discussions/1543
    // eslint-disable-next-line jest/no-commented-out-tests, jest/no-disabled-tests
    it.skip('should handle 403 unauthorized from API', async () => {
      const snap = await installSnap();

      const { unmock } = await snap.mock({
        url: 'https://api.walletguard.app/snaps/v0/eth/mainnet/transaction',
        response: {
          status: 403,
          body: 'Forbidden',
        },
      });

      const response = await snap.sendTransaction({
        chainId: ChainId.EthereumMainnet,
      });

      const expected = UnauthorizedComponent();

      expect(response).toRender(expected);
      unmock();
    });
  });
});

describe('onRpcRequest', () => {
  describe('accounts', () => {
    it('should block requests not from dashboard.walletguard.app', async () => {
      const snap = await installSnap();

      const initial = await snap.request({
        origin: 'https://some-random.com',
        method: RpcRequestMethods.GetAccount,
        params: {},
      });

      expect(initial).toRespondWith(null);

      await snap.request({
        method: RpcRequestMethods.UpdateAccount,
        origin: 'https://some-random.com',
        params: {
          walletAddress: '0x1234567',
        },
      });

      const updated = await snap.request({
        origin: 'https://some-random.com',
        method: RpcRequestMethods.GetAccount,
        params: {},
      });

      expect(updated).toRespondWith(null);
    });

    it('updateAccount should update the users localstorage wallet address', async () => {
      const snap = await installSnap();

      const initial = await snap.request({
        origin: 'https://dashboard.walletguard.app',
        method: RpcRequestMethods.GetAccount,
        params: {},
      });

      expect(initial).toRespondWith(null);

      await snap.request({
        method: RpcRequestMethods.UpdateAccount,
        origin: 'https://dashboard.walletguard.app',
        params: {
          walletAddress: '0x1234567',
        },
      });

      const updated = await snap.request({
        origin: 'https://dashboard.walletguard.app',
        method: RpcRequestMethods.GetAccount,
        params: {},
      });

      expect(updated).toRespondWith('0x1234567');
      expect(updated).toSendNotification('kj;l', 'inApp');
    });
  });
});

describe('onCronJob', () => {
  describe('checkApprovals', () => {
    it('should skip checking approvals if no wallet address exists', async () => {
      const snap = await installSnap();

      const output = await snap.runCronjob({
        method: CronJobMethods.CheckApprovals,
      });

      expect(output.notifications).toHaveLength(0);
      await snap.close();
    });

    it('should remind the user once to setup approval reminders', async () => {
      const snap = await installSnap();
      const output = snap.runCronjob({
        method: CronJobMethods.CheckApprovals,
        params: {},
      });

      const ui = await output.getInterface();

      assert(ui.type === 'alert');

      expect(ui).toRender(
        panel([
          heading('Complete onboarding'),
          text(
            'Get automated reminders to revoke open approvals that can put your assets at risk for fraud. Setup using our dashboard in under 2 minutes.',
          ),
          copyable('dashboard.walletguard.app'),
        ]),
      );
    });

    it('should fetch approvals and notify the user of high risk open approvals', async () => {
      const snap = await installSnap();

      await snap.request({
        origin: 'https://dashboard.walletguard.app',
        method: RpcRequestMethods.UpdateAccount,
        params: {
          walletAddress: '0x123',
        },
      });

      const { unmock } = await snap.mock({
        url: 'https://api.walletguard.app/snaps/v0/approvals/?address=0x123',
        response: {
          status: 200,
          body: JSON.stringify(ApprovalsWithOneHighRiskWarning),
          contentType: 'application/json',
        },
      });

      const output = snap.runCronjob({
        method: CronJobMethods.CheckApprovals,
        params: {},
      });

      const response = await output;

      expect(response.notifications).toHaveLength(1);
      expect(response).toSendNotification(
        `Warning: You have 1 open approval which can put your assets at risk. Head to https://dashboard.walletguard.app/0x123 to remediate`,
        NotificationType.InApp,
      );

      unmock();
      await snap.close();
    });

    // it('should fetch approvals and skip notifying if there are no high risk approvals', async () => {
    //   const snap = await installSnap();

    // });

    // TODO
    // it('should skip notifying the user if their approvals have not changed', () => {
    //   const snap = await installSnap();

    // });
  });
});
