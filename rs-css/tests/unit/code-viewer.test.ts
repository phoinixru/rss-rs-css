import { numbers, numToString } from '../../src/components/code-viewer';

describe('Numbers generator', () => {
  it('should generate array with  numbers', () => {
    const result = numbers(5);
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  it('should handle empty arrays', () => {
    const result = numbers();
    expect(result).toEqual([]);
  });
});

describe('Number formatter', () => {
  it('should format number correctly', () => {
    const result = numToString(1, 3, '0');
    expect(result).toEqual('001');
  });

  it('should use default parameters', () => {
    const result = numToString(1);
    expect(result).toEqual(' 1');
  });
});
