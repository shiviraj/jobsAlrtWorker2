const {
  removeComments,
  snakeCase,
  getRows,
  getHeadRows,
  makeKeysUnique,
  createDateInstance,
} = require('../src/utils/utils');

describe('Utils', () => {
  test('Should remove the comments from html text', () => {
    const html = `<div>Hello</div><!-- <h1>world</h1> -->`;
    expect(removeComments(html)).toEqual('<div>Hello</div>');
  });

  test('Should not remove comments if not comments is there', () => {
    const html = '<div>Hello World</div>';
    expect(removeComments(html)).toBe('<div>Hello World</div>');
  });
});

describe('Snake Case', () => {
  test('Should convert text into snake case', () => {
    const text = 'This is text.';
    expect(snakeCase(text)).toBe('this_is_text');
  });

  test('Should convert text with trailing space into snake case', () => {
    const text = ' This is text. ';
    expect(snakeCase(text)).toBe('this_is_text');
  });
});
