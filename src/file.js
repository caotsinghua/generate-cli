const fsPromise = require('fs').promises;
const fs = require('fs');
const path = require('path');
const templatePath = path.resolve(__dirname, './template');
let result = [];

const parseDir = async dirPath => {
  const stat = await fsPromise.stat(dirPath);
  if (stat.isFile()) {
    result.push(dirPath);
  } else if (stat.isDirectory()) {
    const dirArr = await fsPromise.readdir(dirPath);
    await Promise.all(
      dirArr.map(name => {
        return parseDir(path.resolve(dirPath, name));
      })
    );
  }
};

const getDir = async (type, outdir) => {
  if (type === 'admin') {
    result = [];
    const basePath = path.resolve(templatePath, 'admin');
    await parseDir(basePath);
    result = result.map(filePath => filePath.replace(basePath, ''));
    await Promise.all(
      result.map(async filePath => {
        await fsPromise.copyFile(
          path.join(basePath, filePath),
          path.join(outdir, filePath),
          fs.constants.COPYFILE_FICLONE
        );
      })
    );
  }
};

getDir('admin', path.resolve(__dirname, '../demo'));
