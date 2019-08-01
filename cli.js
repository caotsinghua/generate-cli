#!/usr/bin/env node
const React = require('react');
const importJsx = require('import-jsx');
const { render } = require('ink');
const commander = require('commander');
const meow = require('meow');
const generate = require('./generate');
const path = require('path');
const { downloadRepo } = require('./util');
const chalk = require('chalk');
// const cli = meow(
//   `
//     Usage
//       $ generator <operation>
//     Options
//       --project-name 项目名称
//       --rewrite-path 覆盖的项目路径
//     Examples
//       $generator admin --project-name=admin --rewrite-path=./demo1
// `,
//   {
//     flags: {
//       'project-name': {
//         type: 'string',
//         default: 'admin'
//       },
//       'rewrite-path': {
//         type: 'string',
//         default: ''
//       }
//     }
//   }
// );
// console.log(cli)

commander.version(require('./package.json').version);

commander
  .command('init <project-name>')
  .description('init <project-name>')
  .option('-r, --repository <repository>', '从github初始化，包路径为 github用户名/包名')
  .action(async (projectName, options) => {
    // get todir
    const target = path.resolve(process.cwd(), projectName);
    const { repository } = options;
    console.log(chalk.bgCyan('正在生成...'));
    if (repository) {
      try {
        await downloadRepo(repository, target);
      } catch (e) {
        console.log(chalk.red('下载失败', e.message || ''));
      }
    } else {
      generate(target);
    }
    console.log(chalk.bgCyan('成功...'));
  });

commander.on('command:*', function() {
  console.error('Invalid command: %s\nSee --help for a list of available commands.', commander.args.join(' '));
  process.exit(1);
});
commander.parse(process.argv);
