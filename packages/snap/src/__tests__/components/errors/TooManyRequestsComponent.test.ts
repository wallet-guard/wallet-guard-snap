import { panel, heading, text } from '@metamask/snaps-ui';
import { TooManyRequestsComponent } from '../../../components/errors/TooManyRequestsComponent';

describe('TooManyRequestsComponent', () => {
  it('should render TooManyRequestsComponent correctly', () => {
    const expected = panel([
      heading('Slow down'),
      text(
        "We've detected too many requests from you. Please try again later.",
      ),
    ]);

    const actual = TooManyRequestsComponent();
    expect(actual).toStrictEqual(expected);
  });
});
