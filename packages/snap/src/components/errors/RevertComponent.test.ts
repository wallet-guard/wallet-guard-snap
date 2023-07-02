import { panel, heading, text } from '@metamask/snaps-ui';
import { RevertComponent } from './RevertComponent';

describe('RevertComponent', () => {
  it('should render RevertComponent correctly', () => {
    const expected = panel([
      heading('Revert warning'),
      text(
        'The transaction will be reverted and your gas fee will go to waste.',
      ),
    ]);

    const actual = RevertComponent();
    expect(actual).toStrictEqual(expected);
  });
});
