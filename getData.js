const https = require('https');
const moment = require('moment');
require('./src/db/connect.js');
const fetchDetails = require('./src/fetchAllDetails');
const { fetchJob, updateDB, needToUpload } = require('./src/fetchJob');
const { verifyAlrt, failureAlrt } = require('./src/alrt');

const currentTime = () =>
  moment().utcOffset('+05:30').format('MMM DD, YYYY hh:mm:ss A');

const wakeAnotherWorker = (url) => https.request(url).end();

const main = async () => {
  const job = await fetchJob();
  console.log(job || 'No job pending...', currentTime(), '\n');
  try {
    if (job) {
      const details = await fetchDetails(job.url);
      const newJob = await updateDB(details, job);
      await verifyAlrt(newJob);
      console.log('updated\n\t', currentTime());
      return main();
    }
    setTimeout(main, 600000);
  } catch (e) {
    await needToUpload(job);
    await failureAlrt(job);
    main();
  }
};

setInterval(() => wakeAnotherWorker(process.env.ANOTHER_WORKER), 300000);
main();
