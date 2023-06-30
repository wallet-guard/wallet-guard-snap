import { panel, heading, text } from '@metamask/snaps-ui';
import { ErrorComponent } from './ErrorComponent';

describe('ErrorComponent', () => {
  it('should render ErrorComponent correctly', () => {
    const expected = panel([
      heading('Error while simulating transaction'),
      text(
        'Please contact support@walletguard.app if you continue seeing this issue.',
      ),
    ]);

    const actual = ErrorComponent();
    expect(actual).toStrictEqual(expected);
  });
});
