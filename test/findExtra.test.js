const findExtra = require('../src/jobsarkari/utils/findExtra');

const json = [
  {
    node: 'element',
    tag: 'div',
    attr: { id: 'rslt_slbs_sction' },
    child: [
      {
        node: 'element',
        tag: 'div',
        child: [
          {
            node: 'element',
            tag: 'ul',
            child: [
              {
                node: 'element',
                tag: 'a',
                attr: { href: 'https://www.example.com/', target: '_blank' },
                child: [{ node: 'text', text: 'HSSC Group D Result' }],
              },
            ],
          },
        ],
      },
    ],
  },
];

const json2 = [
  {
    node: 'element',
    tag: 'a',
    attr: { href: '#rslt_slbs_sction' },
    child: [{ node: 'text', text: 'Check Result' }],
  },
];

describe('Links', () => {
  test('Should returns the link from given data of html in json', () => {
    expect(findExtra(json, {})).toStrictEqual({
      important_links: { hssc_group_d_result: 'https://www.example.com/' },
      state: [],
    });
  });

  test('Should returns the state from given post', () => {
    expect(findExtra(json2, {})).toStrictEqual({
      important_links: {},
      state: ['result'],
    });
  });
});
