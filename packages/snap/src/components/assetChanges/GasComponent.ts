import { Panel, divider, panel, text } from '@metamask/snaps-ui';
import { SimulatedGas } from '../../types/simulateApi';

export const GasComponent = (gas: SimulatedGas): Panel => {
  const gasValue = `${mapCurrencyPrefix(gas.currency)}${gas.fiatValue}`;
  return panel([divider(), text(`Gas (estimate): ${gasValue}`)]);
};

function mapCurrencyPrefix(currency: string): string {
  switch (currency) {
    case 'USD':
      return '$';
    default:
      return '$';
  }
}
