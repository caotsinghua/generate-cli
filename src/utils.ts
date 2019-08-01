import fs from 'fs';
import path, { dirname } from 'path';
import { TEMPLATE_TYPE } from './Ui';
import React from 'react';
import downloadGitRepo from 'download-git-repo';
const templatePath = path.resolve(__dirname, '../template');

function copyDir(fromDir: string, toDir: string) {
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

export function generate(to: string, type: TEMPLATE_TYPE | React.Key = TEMPLATE_TYPE.IVIEW_ADMIN) {
  switch (type) {
    case TEMPLATE_TYPE.IVIEW_ADMIN:
      const fromDir = path.resolve(templatePath, 'admin');
      copyDir(fromDir, to);
      return true;
  }
  return false;
}
