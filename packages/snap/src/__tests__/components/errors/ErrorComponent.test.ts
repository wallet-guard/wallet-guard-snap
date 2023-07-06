import { panel, heading, text } from '@metamask/snaps-ui';
import { ErrorComponent } from '../../../components/errors/ErrorComponent';

describe('ErrorComponent', () => {
  it('should render ErrorComponent correctly', () => {
    const expected = panel([
      heading('Error while simulating transaction'),
      text(
        `Please contact support@walletguard.app if you continue seeing this issue. In the meanwhile review this transaction in the Details tab`,
      ),
    ]);

    const actual = ErrorComponent();
    expect(actual).toStrictEqual(expected);
  });
});
