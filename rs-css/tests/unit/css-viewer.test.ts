import { addLineBreaks } from '../../src/components/css-viewer';

describe('Line breaker', () => {
  it('should use br for line breaks', () => {
    const result = addLineBreaks(`line1\nline2`);
    expect(result).toEqual('line1<br>line2');
  });
});
