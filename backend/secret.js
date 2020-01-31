const getSecret = key => {
  // Inside function so process.env is resolved when called
  const secrets = {
    dbUri: process.env.MONGODB_URI
  };
  
  return secrets[key];
};

module.exports = getSecret;
