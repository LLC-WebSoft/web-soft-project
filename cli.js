'use strict';

const parseOptions = require('parse-options');
const { createServer } = require('./lib/server');

const commands = {
  create: {
    server: createServer
  }
};

(async () => {
  const { command, target } = parseOptions('command target', process.argv);
  const directory = process.cwd();
  if (!command || !target) throw new Error('Both command and target options must be specified.');
  commands[command][target](directory);
})();
