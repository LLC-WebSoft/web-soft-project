const { ask, close } = require('./dialog');
const fs = require('fs');
const path = require('path');

const askInformation = async (information) => {
  const result = {};
  for (const param in information) {
    result[param] = await ask(information[param]);
  }
  close();
  return result;
};

const createPath = (filePath) => {
  const directory = path.dirname(filePath);
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
};

const createFiles = async (directory, localPath, files, values) => {
  createPath(directory);
  for (const fileName in files) {
    const file = files[fileName];
    let data = '';
    if (fileName === '.gitignore') data = file;
    else {
      data = fs.readFileSync(path.resolve(localPath, fileName), { encoding: 'utf-8' });
      for (const param of file) {
        if (typeof param === 'object') {
          data = data.replaceAll(`$${param.name}$`, param.convert(values[param.name]));
        } else {
          data = data.replaceAll(`$${param}$`, values[param]);
        }
      }
    }
    createPath(path.resolve(directory, fileName));
    fs.writeFileSync(path.resolve(directory, fileName), data);
  }
};

module.exports = {
  askInformation,
  createFiles
};
