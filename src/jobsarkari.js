const moment = require('moment');

const fetchDetails = require('./jobsarkari/fetchAllDetails');
const { fetchJob, updateDB, needToUpload } = require('./jobsarkari/fetchJob');
const { verifyAlrt, failureAlrt } = require('./jobsarkari/alrt');

const currentTime = () =>
  moment().utcOffset('+05:30').format('MMM DD, YYYY hh:mm:ss A');

const jobsarkari = async () => {
  const job = await fetchJob();
  console.log(job || 'Jobsarkari, No job pending...', currentTime(), '\n');
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

module.exports = jobsarkari;
