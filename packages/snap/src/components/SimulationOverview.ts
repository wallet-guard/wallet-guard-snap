import { heading, panel, text } from '@metamask/snaps-ui';

export const SimulationOverview = (message: string[] | undefined) => {
  if (!message) {
    return '';
  }

  return panel([heading('Overview Message'), text(message?.join(' ') || '')]);
};
