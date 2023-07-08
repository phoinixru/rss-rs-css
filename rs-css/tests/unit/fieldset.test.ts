import { classes } from '../../src/components/fieldset';

describe('Class names handler', () => {
  it('should form correct class name attribute', () => {
    const result = classes('fancy', 'small');
    expect(result).toEqual('fancy small');
  });
});
