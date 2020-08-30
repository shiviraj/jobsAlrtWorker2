const sinon = require('sinon');
const fetch = require('../src/utils/fetchUrl');
const fetchAllDetails = require('../src/fetchAllDetails');
const html = require('./fixture/html');

describe('Fetch All Details', () => {
  beforeEach(() => {
    const get = sinon.stub(fetch, 'get');
    get.withArgs('url').resolves(html);
  });

  afterEach(() => sinon.restore());

  test('Should fetch all details of post', (done) => {
    fetchAllDetails('url').then((result) => {
      expect(result).toStrictEqual({
        age_limit_details: {
          body: [
            ['Minimum', '21 Years'],
            ['Maximum', '30 Years'],
            ['Relaxation as per Govt. Rule', ''],
          ],
          head: ['As on 01/08/2020', ''],
        },
        application_fee: {
          body: [
            ['UR/OBC/EWS', 'Rs. 850/-'],
            ['SC/ST/PwBD', 'Rs. 175/-'],
            [
              'Mode of Payment',
              ' Candidate Have to Pay Application Fee Through Debit Card, Credit Card or Net Banking.',
            ],
          ],
          head: ['Category', 'Amount'],
        },
        general: {
          company: 'NHB  (National Housing Bank)',
          form_type: 'Online',
          last_date: '18/09/2020',
          location: 'All India / Central Govt',
          qualification_required: 'Graduation',
          total_vacancies: '16',
        },
        how_to_apply: [
          'Candidate Can Apply through Online Mode.',
          'Click On the Apply Online Link given in Important Link Section.',
          'Fill All the Mandatory Details in the Application form.',
          'Upload the Scanned Copy of Documents in the Prescribed Size.',
          'Take Printout of your Application form for Future Reference.',
          'Online Application Can be Submitted on or Before 18th Sept. 2020.',
        ],
        important_dates: {
          advt_date: '29/08/2020',
          advt_no: 'NHB/HR &amp; Admin/Recruitment/2020-21/02',
          application_begin: '29/08/2020',
          conduct_of_interview: 'Jan/Feb 2021',
          declaration_of_final_result: 'Feb/March 2021',
          download_admit_card: '10 days prior to the Exam',
          'download_of_e-call_letter_for_interview': 'Jan/Feb 2021',
          last_date_to_apply_online: '18/09/2020.',
          online_exam: 'October/November 2020',
          result_of_online_exam: 'November/December 2020',
        },
        important_links: {
          download_notification: 'https://www.jobsalrt.com/notification.pdf',
          login: 'https://ibpsonline.ibps.in/nhbams1aug20/',
          official_website: 'https://nhb.org.in/',
          registration:
            'https://ibpsonline.ibps.in/nhbams1aug20/basic_details.php',
        },
        selection_process: ['Online Exam.', 'Interview.'],
        title: 'NHB 16 Assistant Manager Posts Recruitment',
        vacancy_details: {
          body: [
            [
              'Assistant Manager Scale I',
              '06',
              '03',
              '03',
              '04',
              '00',
              '16',
              "Bachelor's Degree in any discipline with min 60% marks or a full time Master degree in any discipline with 55% marks. Candidates possessing qualification of Chartered Accountant/CMA/Company Secretary",
            ],
          ],
          head: [
            'Post Name',
            'UR',
            'EWS',
            'OBC',
            'SC',
            'ST',
            'Total',
            'Qualification',
          ],
        },
      });
      done();
    });
  });
});
