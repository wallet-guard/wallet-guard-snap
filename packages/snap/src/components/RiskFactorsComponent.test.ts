import { panel, heading, text } from '@metamask/snaps-ui';
import { RiskFactor, Severity, WarningType } from '../types/simulateApi';
import { RiskFactorsComponent } from './RiskFactorsComponent';

describe('RiskFactorsComponent', () => {
  it('should render an empty panel when there are no risk factors', () => {
    const riskFactors: RiskFactor[] = [];
    const expected = panel([]);
    const actual = RiskFactorsComponent(riskFactors);
    expect(actual).toStrictEqual(expected);
  });

  it('should render a panel with risk factors when provided', () => {
    const riskFactors: RiskFactor[] = [
      {
        message: 'Domain identified as a wallet drainer.',
        severity: Severity.Critical,
        type: WarningType.Drainer,
        value: '',
      },
      {
        message: 'This domain was recently created and has low trust.',
        severity: Severity.High,
        type: WarningType.RecentlyCreated,
        value: '3',
      },
    ];
    const expected = panel([
      heading('Risk Factors'),
      text('• Domain identified as a wallet drainer.'),
      text('• This domain was recently created and has low trust.'),
    ]);
    const actual = RiskFactorsComponent(riskFactors);
    expect(actual).toStrictEqual(expected);
  });
});
