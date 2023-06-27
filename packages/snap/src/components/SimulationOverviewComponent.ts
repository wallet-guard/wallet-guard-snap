import { Panel, divider, heading, panel, text } from '@metamask/snaps-ui';
import { SimulationOverviewType } from '../types/simulateApi';

export const SimulationOverviewComponent = (
  overview: string,
  warningType: SimulationOverviewType,
): Panel => {
  if (!overview || warningType === SimulationOverviewType.None) {
    return panel([]);
  }

  if (warningType === SimulationOverviewType.Info) {
    return panel([heading('Overview Message'), text(overview), divider()]);
  } else if (warningType === SimulationOverviewType.Verified) {
    return panel([
      heading('Overview Message'),
      text('✅ ', overview),
      divider(),
    ]);
  } else if (warningType === SimulationOverviewType.Warn) {
    return panel([heading('Warning'), text('🚨 ', overview), divider()]);
  }

  return panel([]);
};
