import { toggleList, CssClasses } from '../../src/components/levels';

describe('Menu toggle', () => {
  it('should work without passing parameters', () => {
    const { body } = document;
    toggleList();
    let result = body.classList.contains(CssClasses.OPEN);

    expect(result).toEqual(true);

    toggleList();
    result = body.classList.contains(CssClasses.OPEN);

    expect(result).toEqual(false);
  });

  it('should correctly toggle menu state', () => {
    const { body } = document;
    toggleList(true);
    const result = body.classList.contains(CssClasses.OPEN);

    expect(result).toEqual(true);
  });
});
