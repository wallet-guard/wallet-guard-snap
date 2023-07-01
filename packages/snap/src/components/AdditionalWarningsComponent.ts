import { Panel, Text, heading, panel, text } from '@metamask/snaps-ui';
import { RiskFactor } from '../types/simulateApi';

export const AdditionalWarningsComponent = (
  riskFactors: RiskFactor[],
): Panel => {
  if (riskFactors?.length === 0) {
    return panel([]);
  }

  const warnings: Text[] = riskFactors.map((warning) => text(warning.message));

  return panel([heading('Additional Warnings'), ...warnings]);
};
