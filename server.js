const express = require('express');
require('./main');

const app = express();

app.get('/', (req, res) => {
  res.send({ running: true });
});

app.listen(process.env.PORT);

main();
