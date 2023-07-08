import { html } from '../../src/components/board';

describe('HTML description for an element', () => {
  it('should correctly describe element', () => {
    const el = document.createElement('jar');
    const result = html(el);
    expect(result).toEqual('<jar></jar>');
  });

  it('should correctly describe element with attributes', () => {
    const el = document.createElement('jar');
    el.classList.add('fancy');
    const result = html(el);
    expect(result).toEqual('<jar class="fancy"></jar>');
  });
});
