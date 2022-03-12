const { ask } = require('./dialog');

const createServer = async (directory) => {
  const projectName = await ask('Project name: ');
  console.log(projectName, directory);
};

module.exports = {
  createServer
};
