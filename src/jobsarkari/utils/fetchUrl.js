const axios = require('axios');

const get = async (url) => await axios.get(url);

module.exports = { get };
