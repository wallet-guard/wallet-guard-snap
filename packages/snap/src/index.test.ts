import { NotificationType, installSnap } from '@metamask/snaps-jest';
import { expect } from '@jest/globals';
import { UnsupportedChainComponent } from './components';
import { ApprovalsWithOneHighRiskWarning } from './mocks';
import { assert } from '@metamask/utils';
import { copyable, heading, panel, text } from '@metamask/snaps-ui';

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

describe('onCronJob', () => {
  describe('checkApprovals', () => {
    it('should skip checking approvals if no wallet address exists', async () => {
      const snap = await installSnap();

      const output = await snap.runCronjob({
        method: 'checkApprovals',
        params: {},
      });

      expect(output.notifications).toHaveLength(0);
      await snap.close();
    });

    it('should remind the user once to setup approval reminders', async () => {
      const snap = await installSnap();
      const output = snap.runCronjob({
        method: 'checkApprovals',
        params: {},
      });

      const ui = await output.getInterface();

      assert(ui.type === 'alert');

      expect(ui).toRender(
        panel([
          heading('Complete onboarding'),
          text(
            'Get automated reminders to revoke your open approvals which can put your assets at risk for fraud. Visit our dashboard setup in under 2 minutes',
          ),
          copyable('dashboard.walletguard.app'),
        ]),
      );

      await ui.ok();

      const result = await output;
      expect(result).toSendNotification('', NotificationType.InApp);
    });

    // it('should skip reminding the user if it has already reminded', async () => {
    //   const snap = await installSnap();

    // });

    it('should fetch approvals and notify the user of high risk open approvals', async () => {
      const snap = await installSnap();

      await snap.request({
        origin: 'https://dashboard.walletguard.app',
        method: 'updateAccount',
        params: {
          walletAddress: '0x123',
        },
      });

      const { unmock } = await snap.mock({
        url: 'https://api.walletguard.app/snaps/v0/approvals/eth/0x123',
        response: {
          status: 200,
          body: JSON.stringify(ApprovalsWithOneHighRiskWarning),
          contentType: 'application/json',
        },
      });

      const output = snap.runCronjob({
        method: 'checkApprovals',
        params: {},
      });

      const response = await output;

      expect(response.notifications).toHaveLength(1);
      // expect(response).toSendNotification(
      //   `Warning: You have 1 open approval which can put your assets at risk. Head to https://dashboard.walletguard.app/0x123 to remediate`,
      //   NotificationType.InApp,
      // );

      await snap.close();
      unmock();
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
