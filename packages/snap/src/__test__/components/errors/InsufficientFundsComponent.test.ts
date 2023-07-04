import { panel, heading } from '@metamask/snaps-ui';
import { InsufficientFundsComponent } from '../../../components/errors/InsufficientFundsComponent';

describe('InsufficientFundsComponent', () => {
  it('should render InsufficientFundsComponent correctly', () => {
    const expected = panel([heading('Insufficient funds')]);

    const actual = InsufficientFundsComponent();
    expect(actual).toStrictEqual(expected);
  });
});
