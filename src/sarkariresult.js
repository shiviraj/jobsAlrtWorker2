const moment = require('moment');
const fetchDetails = require('./sarkariresult/fetchAllDetails');
const {
  fetchJob,
  updateDB,
  needToUpload,
} = require('./sarkariresult/fetchJob');
const { verifyAlrt, failureAlrt } = require('./sarkariresult/alrt');

const currentTime = () =>
  moment().utcOffset('+05:30').format('MMM DD, YYYY hh:mm:ss A');

const sarkariResult = async (main) => {
  // const job = await fetchJob();

  const job = {
    url: 'https://sarkariresults.info/2021/rajasthan-hc-district-judge.php',
    name: 'jobs',
  };

  console.log(job || 'Sarkari Result, No job pending...', currentTime(), '\n');
  try {
    if (job) {
      const details = await fetchDetails(job.url);
      // const newJob = await updateDB(details, job);
      // await verifyAlrt(newJob);
      console.log('updated\n\t', currentTime());
      main();
    }
  } catch (e) {
    console.log('error');
    // await needToUpload(job);
    // await failureAlrt(job);
    main();
  }
};

module.exports = sarkariResult;
