const path = require('path');
const { askInformation, createFiles } = require('./utils');

const information = {
  projectName: 'Project name',
  projectDescription: 'Description of the project',
  projectUrl: 'Url for project repository',
  authorName: 'Author name',
  authorEmail: 'Author email',
  keywords: 'Key words devided by comma',
  preCommit: 'Add pre-commit hooks?(Need git repository before install packages.)(y/n)',
  ciAction: 'Add github ci workflow?(Enter pull_request target branch or nothing for cancel)'
};

const preCommit = `"pre-commit": "^1.2.2"
},

"pre-commit": [
  "prettier",
  "lint",
  "test"
]`;

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
    },
    {
      name: 'preCommit',
      convert: (value) => {
        if(value === 'y' || value === 'yes' ) {
          return preCommit;
        } else {
          return `}`
        }
      }
    }
  ],
  'README.md': ['projectName', 'projectDescription'],
  'nodemon.json': [],
  'docker-compose.yml': [],
  '.prettierrc.json': [],
  '.prettierignore': [],
  '.gitignore': 'node_modules',
  '.eslintrc': [],
  '.eslintignore': [],
  '.editorconfig': [],
  'src/index.js': [],
  'src/modules/index.js': [],
  'db/structure.sql': [],
  'test/unit/.gitkeep': [],
  'test/integration/.gitkeep': []
};

const createServer = async (directory) => {
  const values = await askInformation(information);

  if (values['ciAction']) {
    files['.github/workflows/ci.yml'] = ['ciAction'];
  }

  createFiles(path.resolve(directory, values.projectName), path.resolve(__dirname, 'server'), files, values);
};

module.exports = {
  createServer
};
