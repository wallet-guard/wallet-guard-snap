import { Panel, divider, heading, panel, text } from '@metamask/snaps-ui';
import { RecommendedActionType } from '../types/simulateApi';

export const SimulationOverviewComponent = (
  overview: string,
  recommendedAction: RecommendedActionType,
): Panel => {
  if (!overview || recommendedAction === RecommendedActionType.None) {
    return panel([]);
  }

  if (recommendedAction === RecommendedActionType.Warn) {
    return panel([heading('Heads up'), text(overview), divider()]);
  } else if (recommendedAction === RecommendedActionType.Block) {
    return panel([heading('🚨 Warning'), text(overview), divider()]);
  }

  return panel([]);
};
