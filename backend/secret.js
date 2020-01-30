const secrets = {
  dbUri: process.env.MONGODB_URI
};

const getSecret = key => secrets[key];

module.exports = getSecret;
