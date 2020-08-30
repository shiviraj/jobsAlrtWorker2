const https = require('https');

const get = (url) => {
  return new Promise((resolve) => {
    https
      .request(url, (res) => {
        res.setEncoding('utf8');
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => resolve(data));
      })
      .end();
  });
};

module.exports = { get };
