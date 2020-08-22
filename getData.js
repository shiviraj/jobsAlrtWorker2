const fetchDetails = require('./src/fetchAllDetails');

const main = async () => {
  const details = await fetchDetails();
  console.log(details);
};

// setInterval(main, 600000);
main();
