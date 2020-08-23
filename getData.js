const moment = require('moment');
require('./src/db/connect.js');
const fetchDetails = require('./src/fetchAllDetails');
const { fetchJob, updateDB } = require('./src/fetchJob');
const { verifyAlrt, failureAlrt } = require('./src/alrt');

const currentTime = () => moment().format('MMM DD, YYYY hh:mm:ss A');

let error = 0;

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
    await failureAlrt(job);
    main();
  }
};

main();
