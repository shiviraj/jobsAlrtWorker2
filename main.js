const https = require('https');
require('./src/db/connect.js');
const jobsarkari = require('./src/jobsarkari');
const sarkariResult = require('./src/sarkariresult');

const wakeAnotherWorker = (url) => https.request(url).end();

const main = async () => {
  await jobsarkari();
  await sarkariResult();
};

setInterval(() => wakeAnotherWorker(process.env.ANOTHER_WORKER), 300000);
setInterval(main, 300000);
main();
