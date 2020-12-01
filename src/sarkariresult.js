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

const sarkariResult = async () => {
  const job = await fetchJob();
  console.log(job || 'Sarkari Result, No job pending...', currentTime(), '\n');
  try {
    if (job) {
      const details = await fetchDetails(job.url);
      const newJob = await updateDB(details, job);
      await verifyAlrt(newJob);
      console.log('updated\n\t', currentTime());
    }
  } catch (e) {
    await needToUpload(job);
    await failureAlrt(job);
  }
};

module.exports = sarkariResult;
