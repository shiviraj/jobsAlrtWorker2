const { findFromTree } = require('./tree');
const { getHeadRows, getRows, snakeCase } = require('./utils');

const findTag = (tag, item) => item.tag === tag;

const getGeneralDetails = (data) => {
  const html = getRows(data);
  return html.reduce((context, post) => {
    const key = post[0].trim();
    if (key.endsWith(':')) {
      const keyName = snakeCase(post[0].replace(/:(.*?)/, ''));
      context[keyName] = post[1].trim();
    }
    return context;
  }, {});
};

const findByClass = (className, item) =>
  item.attr && item.attr.class && item.attr.class.includes(className);

const groupDetails = (rows) => {
  return rows.reduce((result, row, index) => {
    if (row.tag === 'h2') {
      const key = snakeCase(row.child[0].text);
      result[key] = rows[index + 1];
    }
    return result;
  }, {});
};

const parseDetails = (list) => {
  for (let row in list) {
    const [head] = findFromTree(list[row], findTag.bind(null, 'thead'));
    const [body] = findFromTree(list[row], findTag.bind(null, 'tbody'));
    const [tableHead] = getHeadRows(head);
    const tableBody = getRows(body);
    list[row] = { head: tableHead, body: tableBody };
  }
  return list;
};

const makeList = (list) => {
  return list.reduce((result, [row]) => {
    row = row.replace(/(.*?)\./, '').trim();
    return result.concat(row);
  }, []);
};

const modifyDetails = (list) => {
  list.important_dates = list.important_dates.body.reduce((dates, date) => {
    const key = snakeCase(date[0]);
    dates[key] = date[1].trim();
    return dates;
  }, {});
  list.selection_process = makeList(list.selection_process.body);
  list.how_to_apply = makeList(list.how_to_apply.body);
  return list;
};

const getDetails = (data) => {
  const [tables] = findFromTree(data, findByClass.bind(null, 'entry-content'));
  const list = tables.child.filter((item) => {
    return item.tag === 'div' || item.tag === 'h2';
  });
  const general = getGeneralDetails(list[0]);
  const groupedDetails = groupDetails(list);
  const details = parseDetails(groupedDetails);
  const usefulDetails = modifyDetails(details);
  return Object.assign(usefulDetails, { general });
};

module.exports = getDetails;
