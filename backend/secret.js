const secrets = {
  dbUri: process.env.MONGODB_URI
};

const getSecret = key => {
  console.log(process.env);
  return secrets[key];
};

module.exports = getSecret;
