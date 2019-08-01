const fs = require('fs');
const path = require('path');
const templatePath = path.resolve(__dirname, './template');

function copyDir(fromDir, toDir) {
  if (fs.existsSync(toDir)) {
    const files = fs.readdirSync(fromDir);
    files.map(filename => {
      const fromFile = path.resolve(fromDir, filename);
      const toFile = path.resolve(toDir, filename);
      if (fs.statSync(fromFile).isDirectory()) {
        copyDir(fromFile, toFile);
      } else {
        fs.copyFileSync(fromFile, toFile);
      }
    });
  } else {
    // 目标文件夹不存在
    fs.mkdirSync(toDir);
    copyDir(fromDir, toDir);
  }
}

function generate(to) {
  switch (type) {
    case 'admin':
      const fromDir = path.resolve(templatePath, 'admin');
      copyDir(fromDir, to);
      break;
  }
}

module.exports = generate;
