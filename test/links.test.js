const getLink = require('../src/jobsarkari/utils/links');
const html = require('./fixture/json');

describe('Links', () => {
  test('Should returns the link from given data of html in json', () => {
    expect(getLink(html)).toStrictEqual({
      download_notification: 'https://www.jobsalrt.com/notification.pdf',
      login: 'https://ibpsonline.ibps.in/nhbams1aug20/',
      official_website: 'https://nhb.org.in/',
      registration: 'https://ibpsonline.ibps.in/nhbams1aug20/basic_details.php',
    });
  });
});
