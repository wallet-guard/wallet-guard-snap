import { Panel, heading, panel, text } from '@metamask/snaps-ui';

export const TooManyRequestsComponent = (): Panel => {
  return panel([
    heading('Slow down'),
    text("We've detected too many requests from you. Please try again later."),
  ]);
};
