import { divider, heading, panel, text } from '@metamask/snaps-ui';
import { RecommendedActionType } from '../../types/simulateApi';
import { SimulationOverviewComponent } from '../../components/SimulationOverviewComponent';

describe('SimulationOverviewComponent', () => {
  it('should return an empty panel when overview is empty or warningType is None', () => {
    const expected = panel([]);

    const actualNoOverview = SimulationOverviewComponent(
      '',
      RecommendedActionType.Warn,
    );
    expect(actualNoOverview).toStrictEqual(expected);

    const actualWarningTypeNone = SimulationOverviewComponent(
      'Some overview',
      RecommendedActionType.None,
    );
    expect(actualWarningTypeNone).toStrictEqual(expected);
  });

  it('should return the correct panel when warningType is Warn', () => {
    const overview = 'This is a warning overview.';
    const expected = panel([heading('⚠️ Heads up'), text(overview), divider()]);

    const actual = SimulationOverviewComponent(
      overview,
      RecommendedActionType.Warn,
    );
    expect(actual).toStrictEqual(expected);
  });

  it('should return the correct panel when warningType is Block', () => {
    const overview = 'This is a blocking overview.';
    const expected = panel([heading('🚨 Warning'), text(overview), divider()]);

    const actual = SimulationOverviewComponent(
      overview,
      RecommendedActionType.Block,
    );
    expect(actual).toStrictEqual(expected);
  });
});
