import { Panel, divider, heading, panel, text } from '@metamask/snaps-ui';

export const SimulationOverview = (messages: string[] | undefined): Panel => {
  if (!messages || messages.length === 0) {
    return panel([]);
  }

  return panel([
    heading('Overview Message'),
    text(messages.join(' ')),
    divider(),
  ]);
};
