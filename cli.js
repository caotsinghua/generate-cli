#!/usr/bin/env node
const React = require('react');
const importJsx = require('import-jsx');
const { render } = require('ink');
const commander = require('commander');
const meow = require('meow');
const generate = require('./generate');
const path = require('path');
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
  .description('init project')
  .option('-w, --write <path>', 'where to overwrite')
  .action(function(projectName, options) {
    // get todir
    const cwd = process.cwd();
    // TODO:优化表现形式
    console.log('正在生成');
    generate(path.resolve(cwd, projectName));
    console.log('生成完成');
  });
commander.on('command:*', function() {
  console.error('Invalid command: %s\nSee --help for a list of available commands.', commander.args.join(' '));
  process.exit(1);
});
commander.parse(process.argv);