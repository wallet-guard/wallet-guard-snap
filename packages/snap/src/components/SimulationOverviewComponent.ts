import { Panel, divider, heading, panel, text } from '@metamask/snaps-ui';
import { RecommendedActionType } from '../types/simulateApi';

export const SimulationOverviewComponent = (
  overview: string,
  warningType: RecommendedActionType,
): Panel => {
  if (!overview || warningType === RecommendedActionType.None) {
    // TODO: As it stands if an unrecognized warningType is passed the function will return an empty panel. Do we want this?
    return panel([]);
  }

  if (warningType === RecommendedActionType.Warn) {
    return panel([heading('Heads up'), text(overview), divider()]);
  } else if (warningType === RecommendedActionType.Block) {
    return panel([heading('🚨 Warning'), text(overview), divider()]);
  }

  return panel([]);
};
