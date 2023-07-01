import { ErrorType } from '../../types/simulateApi';
import { RevertComponent } from './RevertComponent';
import { showErrorComponent } from './mapper';

describe('showErrorComponent', () => {
  it('should map the revert error correctly', () => {
    const result = showErrorComponent(ErrorType.Revert);
    expect(result).toStrictEqual(RevertComponent());
  });
});
