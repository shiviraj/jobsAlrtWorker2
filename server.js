const express = require('express');
require('./getData');

const app = express();

app.get('/', (req, res) => {
  require('./getData');
  res.send({ running: true });
});

app.listen(process.env.PORT);
