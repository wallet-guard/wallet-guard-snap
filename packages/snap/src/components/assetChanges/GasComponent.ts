import { Panel, panel, text } from '@metamask/snaps-ui';
import { SimulatedGas } from '../../types/simulateApi';
import { formatFiatValue } from '../../utils/helpers';

export const GasComponent = (gas: SimulatedGas): Panel => {
  const fiatValue = formatFiatValue(gas.fiatValue, 2, 2);

  return panel([text(`**Gas** *(estimate)*: ${fiatValue}`)]);
};
