import {
  OnTransactionHandler,
} from '@metamask/snaps-types';
import { SunsetComponent } from './components/errors/Sunset';


// Handle outgoing transactions.
export const onTransaction: OnTransactionHandler = async () => {
  return {
    content: SunsetComponent()
  };
};
