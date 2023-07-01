import { panel, heading, text } from '@metamask/snaps-ui';
import { UnsupportedChainComponent } from './UnsupportedChainComponent';

describe('UnsupportedChainComponent', () => {
  it('should render UnsupportedChainComponent correctly', () => {
    const expected = panel([
      heading('Unsupported chain'),
      text(
        'We will be adding support for more chains very soon. Head to our Discord to suggest which one we support next!',
      ),
    ]);

    const actual = UnsupportedChainComponent();
    expect(actual).toStrictEqual(expected);
  });
});
