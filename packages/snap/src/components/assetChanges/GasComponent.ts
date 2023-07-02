import { Panel, panel, text } from '@metamask/snaps-ui';
import { SimulatedGas } from '../../types/simulateApi';

export const GasComponent = (gas: SimulatedGas): Panel => {
  const gasValue = `${mapCurrencyToPrefix(gas.currency)}${gas.fiatValue}`;
  return panel([text(`**Gas** *(estimate)*: ${gasValue}`)]);
};

// eslint-disable-next-line jsdoc/require-jsdoc
function mapCurrencyToPrefix(currency: string): string {
  switch (currency) {
    case 'USD':
      return '$';
    default:
      return '$';
  }
}
