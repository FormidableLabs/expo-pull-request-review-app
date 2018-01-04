#!/usr/bin/env node

import localExp from 'exp';
import spawn from './scripts/spawn';
import config from './scripts/config';
import log from './scripts/log';
import preDeploy from './scripts/pre-deploy';
import postDeploy from './scripts/post-deploy';

log('Logging into Expo...');
spawn(localExp, ['login', '-u', config.expUsername, '-p', config.expPassword, '--non-interactive'], loginError => {
  if (loginError) {
    throw new Error('Failed to log into Expo');
  } else {
    log('Logged into Expo.');
    log('Preparing project for publish...');
    preDeploy();
  }

  log('Publishing project into Expo.');
  spawn(localExp, ['publish'], publishError => {
    if (publishError) {
      throw new Error('Failed to publish package to Expo');
    } else {
      log('Published project.');
      log('Notifying GitHub...');
      postDeploy();
    }
  });
});
