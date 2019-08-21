#!/usr/bin/env node
import React from 'react';
import { render } from 'ink';
import meow from 'meow';
import chalk from 'chalk';
import path from 'path';
import Ui from './Ui';
import {
  generateAdminTemplate,
  generateCrudTemplate,
  generateAdminTemplateAsync,
  generateAdminTemplateFromRepo,
  generateCrudVuexTemplate
} from './utils';
const log = console.log;
const cli = meow(
  `
    🌈 generate 🌈
    Usage
      $ generate
      $ generate admin --project-name <projectName>
      $ generate crud --resource <resourceName>
      $ generate crud-vuex --resource <resourceName> --store-path <store-path>
      $ generate init --repo <githubUserName/repoName> --path <path>

    Options

      --project-name, -p 创建名为<project-name>的基础后台项目
      --resource,-r 创建资源resource-name的增删改查模板，默认路径为src/view/{resource}
      --repo github仓库地址，格式为 用户名/仓库名 默认caotsinghua/iview-admin-template
      --path 指定目录
      --help 帮助
      --version 查看版本

    Examples

      generate 打开图形界面操作
      generate admin --project-name demo 创建demo的后台项目
      generate admin --project-name ../demo 在上级目录创建后台项目
      generate crud --resource article --path ./src/view  创建资源article的增删改查模板 =>./src/view/articles，
      ps:资源不要复数,默认path为src/view,可以指定path插入模板
      generate crud-vuex --resource article --path ./src/view --store-path src/store/modules
      generate init --repo vuejs/vue --path ./demo 把vue仓库内容拷贝到demo中`,
  {
    flags: {
      'project-name': {
        type: 'string',
        alias: 'p'
      },
      'store-path': {
        type: 'string'
      },
      resource: {
        type: 'string',
        alias: 'r'
      },
      repo: {
        type: 'string'
      },
      path: {
        type: 'string'
      }
    }
  }
);
const enum Action {
  INIT_ADMIN_TEMPLATE = 'admin',
  INSERT_CRUD_TEMPLATE = 'crud',
  INSERT_CRUD_VUEX_TEMPLATE = 'crud-vuex',
  INIT_FROM_REPO = 'init'
}
const main = async () => {
  // 获取input[0],和flags进行判断
  const {
    input: [action],
    flags
  } = cli;

  switch (action) {
    case Action.INIT_ADMIN_TEMPLATE: {
      if (flags['projectName']) {
        const targetDirection = path.resolve(process.cwd(), flags['projectName']);
        log(chalk.white('正在生成'));
        try {
          await generateAdminTemplateAsync(targetDirection);
          log(chalk.green('生成成功'));
        } catch (e) {
          log(chalk.red(e.message || '生成出错'));
        }
      } else {
        log(chalk.bgRed('没有指定--project-name'));
      }
      break;
    }
    case Action.INSERT_CRUD_TEMPLATE: {
      if (!flags['resource']) {
        log(chalk.bgRed('没有指定--resource'));
        return;
      }
      const resource = flags['resource'];
      // feature:设置crud模板插入的目录
      let targetDirection = path.resolve(process.cwd(), flags['path'] || 'src/view', `${resource}s`);
      log(chalk.white('正在生成'));
      try {
        await generateCrudTemplate(resource, targetDirection);
        log(chalk.green('生成成功'));
      } catch (e) {
        log(chalk.red(e.message || '生成出错'));
      }
      break;
    }
    case Action.INSERT_CRUD_VUEX_TEMPLATE: {
      if (!flags['resource']) {
        log(chalk.bgRed('没有指定--resource'));
        return;
      }
      if (!flags['storePath']) {
        log(chalk.bgRed('没有指定--store-path'));
        return;
      }
      const resource = flags['resource'];
      // feature:设置crud模板插入的目录
      let targetDirection = path.resolve(process.cwd(), flags['path'] || 'src/view', `${resource}s`);
      let storePath = path.resolve(process.cwd(), flags['storePath']);
      log(chalk.white('正在生成'));
      try {
        await generateCrudVuexTemplate(resource, targetDirection, storePath);
        log(chalk.green('生成成功'));
      } catch (e) {
        log(chalk.red(e.message || '生成出错'));
      }
      break;
    }
    case Action.INIT_FROM_REPO: {
      const repo = flags.repo || 'caotsinghua/iview-admin-template';
      const targetPath = flags.path;
      // if (!repo) {
      //   log(chalk.bgRed('没有指定--repo'));
      //   return;
      // }
      if (!targetPath) {
        log(chalk.bgRed('没有指定--path'));
        return;
      }
      const destination = path.resolve(process.cwd(), targetPath);
      log(chalk.white(`正在下载${repo}到${destination}...`));
      try {
        await generateAdminTemplateFromRepo(repo, destination);
        log(chalk.green('成功'));
      } catch (e) {
        log(chalk.red(e.message || '生成出错'));
      }
      break;
    }
  }

  if (cli.input.length === 0 && Object.keys(cli.flags).length === 0) {
    render(<Ui />, {
      exitOnCtrlC: true
    });
  }
};

main();
