const secrets = {
  dbUri: "mongodb://localhost:27017/testing-infra"
};

const getSecret = key => secrets[key];

module.exports = getSecret;
