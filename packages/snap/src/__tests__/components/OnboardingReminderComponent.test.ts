import { panel, heading, text, copyable } from '@metamask/snaps-ui';
import { OnboardingReminderComponent } from '../../components/OnboardingReminderComponent';

describe('OnboardingReminderComponent', () => {
  it('should render OnboardingReminderComponent correctly', () => {
    const expected = panel([
      heading('Complete onboarding'),
      text(
        'Get automated reminders to revoke open approvals that can put your assets at risk for fraud.',
      ),
      text('Setup using our dashboard in under 2 minutes.'),
      copyable('dashboard.walletguard.app'),
    ]);

    const actual = OnboardingReminderComponent();
    expect(actual).toStrictEqual(expected);
  });
});
