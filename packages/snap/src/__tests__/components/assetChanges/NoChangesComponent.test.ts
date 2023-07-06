import { Panel, heading, panel } from '@metamask/snaps-ui';
import { NoStateChangesComponent } from '../../../components/assetChanges/NoChangesComponent';

describe('NoStateChangesComponent', () => {
  it('should return a panel with the correct heading', () => {
    const expected: Panel = panel([heading('No state changes detected')]);
    const actual = NoStateChangesComponent();
    expect(actual).toStrictEqual(expected);
  });
});
