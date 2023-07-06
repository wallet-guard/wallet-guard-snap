import { Panel, panel, heading, text, copyable } from '@metamask/snaps-ui';

export const OnboardingReminderComponent = (): Panel => {
  return panel([
    heading('Complete onboarding'),
    text(
      'Get automated reminders to revoke open approvals that can put your assets at risk for fraud.',
    ),
    text('Setup using our dashboard in under 2 minutes.'),
    copyable('dashboard.walletguard.app'),
  ]);
};
