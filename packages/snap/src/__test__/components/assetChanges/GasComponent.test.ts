import { Panel, panel, text } from '@metamask/snaps-ui';
import { Currency, SimulatedGas } from '../../../types/simulateApi';
import { GasComponent } from '../../../components/assetChanges/GasComponent';

describe('GasComponent', () => {
  it('should return a panel with the correct gas estimate text for USD', () => {
    const gas: SimulatedGas = {
      currency: Currency.USD,
      fiatValue: '2.50',
      gasUsedEth: '0.000000000000000001',
    };
    const expected: Panel = panel([
      text(`**Gas** *(estimate)*: $${gas.fiatValue}`),
    ]);
    const actual = GasComponent(gas);
    expect(actual).toStrictEqual(expected);
  });
});
