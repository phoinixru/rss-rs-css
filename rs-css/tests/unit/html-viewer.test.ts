import { item, openBracket, closeBracket, eq, tag, attr, quote, value, space } from '../../src/components/html-viewer';
import { TYPE } from '../../src/types';

describe('Type element maker', () => {
  it('should create span elements with specific type and text content', () => {
    const result = item(TYPE.ATTRIBUTE, 'class');

    expect(result.outerHTML).toEqual(`<span class="${TYPE.ATTRIBUTE}">class</span>`);
  });
});

describe('Punctuation element maker', () => {
  it('should create open bracket element', () => {
    let result = openBracket();
    expect(result.outerHTML).toEqual(`<span class="${TYPE.BRACKET}">&lt;</span>`);

    result = openBracket(true);
    expect(result.outerHTML).toEqual(`<span class="${TYPE.BRACKET}">&lt;/</span>`);
  });

  it('should create close bracket element', () => {
    let result = closeBracket();
    expect(result.outerHTML).toEqual(`<span class="${TYPE.BRACKET}">&gt;</span>`);

    result = closeBracket(true);
    expect(result.outerHTML).toEqual(`<span class="${TYPE.BRACKET}">/&gt;</span>`);
  });

  it('should create equal sign element', () => {
    const result = eq();
    expect(result.outerHTML).toEqual(`<span class="${TYPE.EQ}">=</span>`);
  });

  it('should create quote sign element', () => {
    const result = quote();
    expect(result.outerHTML).toEqual(`<span class="${TYPE.QUOTE}">"</span>`);
  });

  it('should create space element', () => {
    const result = space();
    expect(result.outerHTML).toEqual(`<span class="${TYPE.SPACE}"> </span>`);
  });
});

describe('Tag/attribute element maker', () => {
  it('should create tag element', () => {
    const result = tag('jar');
    expect(result.outerHTML).toEqual(`<span class="${TYPE.TAG}">jar</span>`);
  });

  it('should create attribute element', () => {
    const result = attr('data-id');
    expect(result.outerHTML).toEqual(`<span class="${TYPE.ATTRIBUTE}">data-id</span>`);
  });

  it('should create value element', () => {
    const result = value('10');
    expect(result.outerHTML).toEqual(`<span class="${TYPE.VALUE}">10</span>`);
  });
});
