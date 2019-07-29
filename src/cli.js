#!/usr/bin/env node
const React = require('react');
const importJsx = require('import-jsx');
const { render } = require('ink');
const commander = require('commander');
const meow = require('meow');
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

commander.version(require('../package.json').version);
commander
  .command('init <project-name>')
  .description('init project')
  .option('-w, --write <path>', 'where to overwrite')
  .action(function(projectName, options) {
    // get todir
  });
commander.on('command:*', function() {
  console.error('Invalid command: %s\nSee --help for a list of available commands.', commander.args.join(' '));
  process.exit(1);
});
commander.parse(process.argv);

// const App = importJsx('./App.js');
// render(React.createElement(App));
