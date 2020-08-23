const https = require('https');

const postRequest = (url, data) => {
  const postData = JSON.stringify(data);
  return new Promise((resolve) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': postData.length,
      },
      'User-Agent': 'curl/7.68.0',
    };

    const req = https.request(url, options, resolve);
    req.write(postData);
    req.end();
  });
};

const verifyAlrt = async ({ source, title, url }) => {
  const message = {
    blocks: [
      { type: 'section', text: { type: 'mrkdwn', text: `*${title}*` } },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: '_Need to verify this post_',
        },
      },
    ],
    attachments: [
      {
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `<${source}|Source> of the post \t\t <https://${url}.com/|Post>`,
            },
          },
        ],
      },
    ],
  };

  const slackUrl = process.env.VERIFY_SLACK;
  await postRequest(slackUrl, message);
};

const failureAlrt = async ({ url, name }) => {
  const message = {
    blocks: [
      { type: 'section', text: { type: 'mrkdwn', text: `*${name}*` } },
      {
        type: 'section',
        text: { type: 'mrkdwn', text: `_Need to upload Details_` },
      },
    ],
    attachments: [
      {
        blocks: [
          {
            type: 'section',
            text: { type: 'mrkdwn', text: `<${url}|Source> of the post` },
          },
        ],
      },
    ],
  };

  const slackUrl = process.env.FAILURE_SLACK;
  await postRequest(slackUrl, message);
};

module.exports = { verifyAlrt, failureAlrt };
