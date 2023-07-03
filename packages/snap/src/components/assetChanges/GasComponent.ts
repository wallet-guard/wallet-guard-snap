import { Panel, panel, text } from '@metamask/snaps-ui';
import { Currency, SimulatedGas } from '../../types/simulateApi';

export const GasComponent = (gas: SimulatedGas): Panel => {
  const gasValue = `${mapCurrencyToPrefix(gas.currency)}${gas.fiatValue}`;
  return panel([text(`**Gas** *(estimate)*: ${gasValue}`)]);
};

// eslint-disable-next-line jsdoc/require-jsdoc
function mapCurrencyToPrefix(currency: Currency): string {
  switch (currency) {
    case Currency.USD:
      return '$';
    default:
      return '$';
  }
}
