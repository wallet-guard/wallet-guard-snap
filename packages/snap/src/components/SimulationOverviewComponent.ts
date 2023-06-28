import { Panel, divider, heading, panel, text } from '@metamask/snaps-ui';
import { WarningType } from '../types/simulateApi';

export const SimulationOverviewComponent = (
  overview: string,
  warningType: WarningType,
): Panel => {
  if (!overview || warningType === WarningType.None) {
    return panel([]);
  }

  if (warningType === WarningType.Warn) {
    return panel([heading('Heads up'), text(overview), divider()]);
  } else if (warningType === WarningType.Block) {
    return panel([heading('🚨 Warning'), text(overview), divider()]);
  }

  return panel([]);
};
