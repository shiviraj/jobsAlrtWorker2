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

describe('Make keys unique', () => {
  test('Should generate unique keys', () => {
    const post = { how_to_apply_this_post: [] };
    expect(makeKeysUnique(post)).toMatchObject({ how_to_apply: [] });
  });

  test('Should remove the empty keys', () => {
    const post = { how_to_apply_this_post: [], general: undefined };
    expect(makeKeysUnique(post)).toStrictEqual({ how_to_apply: [] });
  });
});

describe('Create Date instances', () => {
  test('Should create date instances of important_dates', () => {
    const post = {
      general: { last_date: '26/11/2020' },
      important_dates: { advt_no: '26/2020', application_begin: '26/11/2020' },
    };

    expect(createDateInstance(post)).toStrictEqual({
      general: { last_date: 1606329000000 },
      important_dates: { advt_no: '26/2020', application_begin: 1606329000000 },
    });
  });

  test('Should not change an invalid date', () => {
    const post = {
      general: { last_date: '26/11/2020' },
      important_dates: {
        advt_no: '26/2020',
        application_begin: '26/11/2020',
        last_date: 'December 2020',
      },
    };

    expect(createDateInstance(post)).toStrictEqual({
      general: { last_date: 1606329000000 },
      important_dates: {
        advt_no: '26/2020',
        application_begin: 1606329000000,
        last_date: 'December 2020',
      },
    });
  });
});

describe('Get Rows', () => {
  test('Should create row from html object', () => {
    const html = {
      node: 'element',
      tag: 'tbody',
      child: [
        {
          node: 'element',
          tag: 'tr',
          child: [
            {
              node: 'element',
              tag: 'td',
              child: [{ node: 'text', text: '1. Online Exam.' }],
            },
          ],
        },
        {
          node: 'element',
          tag: 'tr',
          child: [
            {
              node: 'element',
              tag: 'td',
              child: [{ node: 'text', text: '2. Interview.' }],
            },
          ],
        },
      ],
    };

    expect(getRows(html)).toStrictEqual([
      ['1. Online Exam.'],
      ['2. Interview.'],
    ]);
  });
});

describe('Get Head Rows', () => {
  test('Should create row from html object', () => {
    const head = {
      node: 'element',
      tag: 'thead',
      child: [
        {
          node: 'element',
          tag: 'tr',
          child: [
            {
              node: 'element',
              tag: 'th',
              child: [{ node: 'text', text: 'Category' }],
            },
            {
              node: 'element',
              tag: 'th',
              child: [{ node: 'text', text: 'Amount' }],
            },
          ],
        },
      ],
    };

    expect(getHeadRows(head)).toStrictEqual([['Category', 'Amount']]);
  });
});
