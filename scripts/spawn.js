import childProcess from 'child_process';
import log from './log';

/*
 * Spawn a child process with a callback when the process exits
 */
export default function spawn(task, args, onClose) {
  const child = childProcess.spawn(task, args, {
    stdio: 'inherit',
    env: process.env
  });

  child.on('error', error => {
    log(error);
  });
  child.on('close', code => {
    onClose(code);
  });
}
