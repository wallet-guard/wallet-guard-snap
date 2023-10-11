import { panel, heading, text } from '@metamask/snaps-ui';
import { UnauthorizedComponent } from '../../../components/errors/UnauthorizedComponent';

describe('UnauthorizedComponent', () => {
  it('should render UnauthorizedComponent correctly', () => {
    const expected = panel([
      heading('Unauthorized'),
      text(
        `Please contact support@walletguard.app if you continue seeing this issue. In the meanwhile review the transaction in the Details tab.`,
      ),
    ]);

    const actual = UnauthorizedComponent();
    expect(actual).toStrictEqual(expected);
  });
});
