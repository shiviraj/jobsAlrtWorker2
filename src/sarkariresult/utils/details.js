const filterFromTree = require('./tree');
const { snakeCase, removeSpace, createDateInstance } = require('./utils');

const findTag = (tag, item) => item.tag === tag;

const findByClass = (className, item) => {
  return (
    item.attr &&
    item.attr.class &&
    (item.attr.class.includes(className) || item.attr.class === className)
  );
};

const findItem = (row, side) => {
  const sideItem = row.child.find(findByClass.bind(null, side));
  return sideItem && sideItem.child ? removeSpace(sideItem.child[0].text) : '';
};

const findFeeItem = (row, tag) => {
  const sideItem = row.child.find(findTag.bind(null, tag));
  return removeSpace(sideItem.child[0].text);
};

const importantDates = (rows) => {
  const impDates = rows.find(findByClass.bind(null, 'imp-dates'));
  const impDatesRows = impDates.child.filter((row) => row.node === 'element');
  const dateRows = impDatesRows.find((item) => item.tag === 'ul');
  const dates = filterFromTree(dateRows, findTag.bind(null, 'li'));
  return dates.reduce((acc, curr) => {
    acc[snakeCase(findItem(curr, 'left'))] = findItem(curr, 'right');
    return acc;
  }, {});
};

const applicationFee = (rows) => {
  const impDates = rows.find(findByClass.bind(null, 'application-fee'));
  const [impDatesRows] = filterFromTree(
    impDates,
    findByClass.bind(null, 'rs-block')
  );
  const dataRows = impDatesRows.child.filter(findTag.bind(null, 'div'));
  const result = dataRows.reduce((acc, curr) => {
    acc.push([findFeeItem(curr, 'p'), findFeeItem(curr, 'span')]);
    return acc;
  }, []);
  return { body: result, head: ['Category', 'Amount'] };
};

const ageLimit = (rows) => {
  const impDates = rows.find(findByClass.bind(null, 'age-limits'));
  const [header] = filterFromTree(impDates, findTag.bind(null, 'h3'));
  const impDatesRows = impDates.child.filter((row) => row.node === 'element');
  const dateRows = impDatesRows.find((item) => item.tag === 'ul');
  const dates = filterFromTree(dateRows, findTag.bind(null, 'li'));
  const result = dates.reduce((acc, curr) => {
    acc.push([findItem(curr, 'left'), findItem(curr, 'right')]);
    return acc;
  }, []);
  return { body: result, head: [removeSpace(header.child[0].text), ''] };
};

const eligibility = (rows) => {
  const impDates = rows.find(findByClass.bind(null, 'eligibility'));
  const impDatesRows = impDates.child.filter((row) => row.node === 'element');
  const dateRows = impDatesRows.find((item) => item.tag === 'ul');
  const dates = filterFromTree(dateRows, findTag.bind(null, 'li'));
  const result = dates.reduce((acc, curr) => {
    acc.push([removeSpace(curr.child[0].text)]);
    return acc;
  }, []);
  return { body: result };
};

const findGroupDetails = (rows) => {
  const group = {};
  group.important_dates = createDateInstance(importantDates(rows));
  group.application_fee = applicationFee(rows);
  group.age_limit_details = ageLimit(rows);
  group.others = { eligibility: eligibility(rows) };
  return group;
};

const findHowToApply = (data) => {
  const [list] = filterFromTree(data, findByClass.bind(null, 'list'));
  const listItems = filterFromTree(list, findTag.bind(null, 'li'));
  const result = listItems.reduce((acc, curr) => {
    acc.push(removeSpace(curr.child[0].text));
    return acc;
  }, []);
  return { how_to_apply: result };
};

const findTableHeader = function (table) {
  const [tableHead] = filterFromTree(table, findTag.bind(null, 'thead'));
  const tableHeadRow = filterFromTree(tableHead, findTag.bind(null, 'th'));
  return tableHeadRow.reduce((acc, curr) => {
    return acc.concat(curr.child[0].text.trim());
  }, []);
};

const findTableBody = function (table) {
  const [body] = filterFromTree(table, findTag.bind(null, 'tbody'));
  const rows = filterFromTree(body, findByClass.bind(null, 'first-row'));

  return rows.reduce((context, element) => {
    const bodyRow = filterFromTree(element, findTag.bind(null, 'td'));
    const rowItems = bodyRow.reduce((acc, curr) => {
      return acc.concat(removeSpace(curr.child[0].text));
    }, []);

    context.push(rowItems);
    return context;
  }, []);
};

const findOtherDetails = (data) => {
  const [, ...tables] = filterFromTree(data, findTag.bind(null, 'table'));

  return tables.reduce((context, table, index) => {
    const head = findTableHeader(table);
    const body = findTableBody(table);
    context[snakeCase(`title_${index}`)] = { head, body };
    return context;
  }, {});
};

const getTitle = (data) => {
  const [titleDiv] = filterFromTree(data, (item) => item.tag === 'h1');
  return titleDiv.child[0].text.replace(/  /g, ' ').trim();
};

const getDetails = (data) => {
  const [list] = filterFromTree(data, findByClass.bind(null, 'block-group'));
  const blocks = list.child.filter((item) => item.node === 'element');
  return findGroupDetails(blocks);
};

module.exports = { getDetails, getTitle, findOtherDetails, findHowToApply };
