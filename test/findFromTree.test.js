const findFromTree = require('../src/jobsarkari/utils/tree');
const json = require('./fixture/json');

describe('Find From Tree', () => {
  test('Should find a node from tree', () => {
    const anonymous = (item) => item && item.text === 'Form Type: ';
    expect(findFromTree(json, anonymous)).toStrictEqual([
      { node: 'text', text: 'Form Type: ' },
    ]);
  });

  test('Should give empty array if node does not exists', () => {
    const anonymous = (item) => item && item.attr && item.attr.id === 'post';
    expect(findFromTree(json, anonymous)).toStrictEqual([]);
  });
});
