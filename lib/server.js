const path = require('path');
const { askInformation, createFiles } = require('./utils');

const information = {
  projectName: 'Project name',
  projectDescription: 'Description of the project',
  projectUrl: 'Url for project repository',
  authorName: 'Author name',
  authorEmail: 'Author email',
  keywords: 'Key words devided by comma'
};

const files = {
  'package.json': [
    'projectName',
    'projectDescription',
    'projectUrl',
    'authorName',
    'authorEmail',
    {
      name: 'keywords',
      convert: (value) => `${value.split(',').join('",\n\t\t"')}`
    }
  ],
  'README.md': ['projectName', 'projectDescription'],
  'nodemon.json': [],
  LICENSE: [],
  'docker-compose.yml': [],
  '.prettierrc.json': [],
  '.prettierignore': [],
  '.gitignore': [],
  '.eslintrc': [],
  '.eslintignore': [],
  '.editorconfig': [],
  'src/index.js': [],
  'src/modules/index.js': [],
  'db/structure.sql': []
};

const createServer = async (directory) => {
  const values = await askInformation(information);
  createFiles(path.resolve(directory, values.projectName), path.resolve(__dirname, 'server'), files, values);
};

module.exports = {
  createServer
};
