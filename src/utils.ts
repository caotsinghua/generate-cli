import fs from 'fs';
import path from 'path';
import downloadGitRepo from 'download-git-repo';
import Metalsmith from 'metalsmith';
import handlebars from 'handlebars';
import config from './config';
import _ from 'lodash';

/**
 *
 * @param fromDir
 * @param toDir
 * 拷贝文件夹
 * TODO: 用metalsmith代替
 */
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

export function generateAdminTemplate(targetDir: string) {
  copyDir(config['admin-template-path'], targetDir);
}
export function generateAdminTemplateAsync(targetDir: string) {
  return new Promise((resolve, reject) => {
    Metalsmith(__dirname)
      .source(config['admin-template-path'])
      .destination(targetDir)
      .build(err => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
  });
}
/**
 *
 * @param repoName
 * @param target
 * 下载git-repo 到指定目录
 */
export const generateAdminTemplateFromRepo = (repoName: string, targetDir: string) => {
  return new Promise((resolve, reject) => {
    downloadGitRepo(repoName, targetDir, (err: any) => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
};

// 注册helper
handlebars.registerHelper('upperFirst', str => {
  return _.upperFirst(_.camelCase(str));
});

/**
 * 生成crud模板
 * --resourceName 资源名
 *
 * 根据resource修改crud-template中的指定模板，再拷贝到cwd/src/view/{resource}中去
 */
/**
 *
 * @param resourceName
 * @param destination
 */
export const generateCrudTemplate = (resourceName: string, destination: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    Metalsmith(__dirname)
      .source(config['crud-template-path'])
      .ignore([''])
      .destination(destination)
      .clean(false)
      .use(function(files, metalsmith, done) {
        Object.keys(files).forEach(filePath => {
          const contents: string | Buffer = files[filePath].contents;
          let contentStr = contents.toString();
          contentStr = handlebars.compile(contentStr)({ resourceName }); // 编译模板
          files[filePath].contents = contentStr;
        });
        done(undefined, files, metalsmith);
      })
      .build(err => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
  });
};

export const generateCrudVuexTemplate = (
  resourceName: string,
  destination: string,
  storePath: string
): Promise<void> => {
  return new Promise((resolve, reject) => {
    Metalsmith(__dirname)
      .source(config['crud-vuex-template-path'])
      .ignore(['store'])
      .destination(destination)
      .clean(false)
      .use(function(files, metalsmith, done) {
        Object.keys(files).forEach(filePath => {
          const contents: string | Buffer = files[filePath].contents;
          let contentStr = contents.toString();
          contentStr = handlebars.compile(contentStr)({ resourceName });
          files[filePath].contents = contentStr;
        });
        done(undefined, files, metalsmith);
      })
      .build(err => {
        if (err) {
          reject(err);
        } else {
          console.log(storePath);
          Metalsmith(__dirname)
            .source(path.join(config['crud-vuex-template-path'], 'store'))
            .destination(storePath)
            .clean(false)
            .use(function(files, metalsmith, done) {
              Object.keys(files).forEach(filePath => {
                const contents: string | Buffer = files[filePath].contents;
                let contentStr = contents.toString();
                contentStr = handlebars.compile(contentStr)({ resourceName });
                files[filePath].contents = contentStr;
                files[`${resourceName}s.js`] = files[filePath];
                delete files[filePath];
              });
              done(undefined, files, metalsmith);
            })
            .build(err => {
              if (err) {
                reject(err);
              } else {
                resolve();
              }
            });
        }
      });
  });
};
