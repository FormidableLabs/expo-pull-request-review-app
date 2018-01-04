import configCircle from './config/circle';
import configTravis from './config/travis';
import configDefault from './config/default';

let config;
if (process.env.TRAVIS === 'true') {
  config = configTravis;
} else if (process.env.CIRCLECI === 'true') {
  config = configCircle;
} else {
  config = configDefault;
}

for (const key in config) {
  const value = config[key];
  // shell envs are weird
  if (
    typeof value === 'undefined' ||
    value === 'undefined' ||
    value === null ||
    value === '' ||
    value === 'false'
  ) {
    throw new Error(`Missing configuration key ${key}`);
  }
}

export default { ...config };
