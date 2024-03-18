import { panel, heading, text } from '@metamask/snaps-ui';
import { UnsupportedChainComponent } from '../../../components/errors/UnsupportedChainComponent';

describe('UnsupportedChainComponent', () => {
  it('should render UnsupportedChainComponent correctly', () => {
    const expected = panel([
      heading('More chains coming soon'),
      text(
        'Currently Wallet Guard supports ETH, Polygon, Optimism, Arbitrum, Optimism, and Base with more chains being added soon. In the meanwhile review this transaction in the Details tab.',
      ),
    ]);

    const actual = UnsupportedChainComponent();
    expect(actual).toStrictEqual(expected);
  });
});
