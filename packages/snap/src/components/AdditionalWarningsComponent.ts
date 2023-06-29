import { Panel, Text, panel, text } from '@metamask/snaps-ui';
import { RiskFactor } from '../types/simulateApi';

export const AdditionalWarningsComponent = (
  riskFactors: RiskFactor[],
): Panel => {
  if (riskFactors?.length === 0) {
    return panel([]);
  }

  const output: Text[] = riskFactors.map((warning) => text(warning.message));

  return panel(output);
};
