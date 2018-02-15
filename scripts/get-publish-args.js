const config = require('./config');

module.exports = function getPublishArgs() {
  const args = ['publish'];
  if (config.deployEnv !== 'production') {
    args.push(`--release-channel ${config.deployEnv}`);
  }
  return args;
};
