import { Panel, Text, panel, text } from '@metamask/snaps-ui';
import { RiskFactor } from '../types/simulateApi';

export const AdditionalWarningsComponent = (
  riskFactors: RiskFactor[],
): Panel => {
  if (riskFactors?.length === 0) {
    return panel([]);
  }

  const output: Text[] = riskFactors.map((warning) => {
    const label = getWarningLabel(warning.severity);

    return text(label, warning.message);
  });

  return panel(output);
};

function getWarningLabel(severity: string) {
  switch (severity) {
    case 'CRITICAL':
      return '🚨';
    case 'HIGH':
      return '‼️';
    case 'MEDIUM':
      return '❗️';
    case 'LOW':
      return '⚠️';
    default:
      return '';
  }
}
