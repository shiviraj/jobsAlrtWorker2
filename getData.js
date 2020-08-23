const moment = require('moment');
require('./src/db/connect.js');
const fetchDetails = require('./src/fetchAllDetails');
const { fetchJob, updateDB } = require('./src/fetchJob');

const currentTime = () => moment().format('MMM DD, YYYY hh:mm:ss A');

const main = async () => {
  try {
    const job = await fetchJob();
    console.log(job, currentTime());

    if (job) {
      const details = await fetchDetails(job.url);

      await updateDB(details, job);
      console.log('updated\n\t', currentTime());

      return main();
    }
    setTimeout(main, 600000);
  } catch (e) {
    console.error(e);
    main();
  }
};

main();
