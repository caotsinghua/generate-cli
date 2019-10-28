#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ink_1 = require("ink");
const meow_1 = __importDefault(require("meow"));
const chalk_1 = __importDefault(require("chalk"));
const path_1 = __importDefault(require("path"));
const Ui_1 = __importDefault(require("./Ui"));
const utils_1 = require("./utils");
const log = console.log;
const cli = meow_1.default(`
    🌈 generate 🌈
    Usage
      $ generate
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
      generate crud --resource article --path ./src/view  创建资源article的增删改查模板 =>./src/view/articles，
      ps:资源不要复数,默认path为src/view,可以指定path插入模板
      generate crud-vuex --resource article --path ./src/view --store-path src/store/modules
      generate init --repo vuejs/vue --path ./demo 把vue仓库内容拷贝到./demo中
      generate init --path ./demo 把vue仓库内容拷贝到./demo中`, {
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
});
var Action;
(function (Action) {
    Action["INSERT_CRUD_TEMPLATE"] = "crud";
    Action["INSERT_CRUD_VUEX_TEMPLATE"] = "crud-vuex";
    Action["INIT_FROM_REPO"] = "init";
})(Action || (Action = {}));
const main = () => __awaiter(this, void 0, void 0, function* () {
    const { input: [action], flags } = cli;
    switch (action) {
        case "crud": {
            if (!flags['resource']) {
                log(chalk_1.default.bgRed('没有指定--resource'));
                return;
            }
            const resource = flags['resource'];
            let targetDirection = path_1.default.resolve(process.cwd(), flags['path'] || 'src/view', resource);
            log(chalk_1.default.white('正在生成'));
            try {
                yield utils_1.generateCrudTemplate(resource, targetDirection);
                log(chalk_1.default.green('生成成功'));
            }
            catch (e) {
                log(chalk_1.default.red(e.message || '生成出错'));
            }
            break;
        }
        case "crud-vuex": {
            if (!flags['resource']) {
                log(chalk_1.default.bgRed('没有指定--resource'));
                return;
            }
            if (!flags['storePath']) {
                log(chalk_1.default.bgRed('没有指定--store-path'));
                return;
            }
            const resource = flags['resource'];
            let targetDirection = path_1.default.resolve(process.cwd(), flags['path'] || 'src/view', `${resource}s`);
            let storePath = path_1.default.resolve(process.cwd(), flags['storePath']);
            log(chalk_1.default.white('正在生成'));
            try {
                yield utils_1.generateCrudVuexTemplate(resource, targetDirection, storePath);
                log(chalk_1.default.green('生成成功'));
            }
            catch (e) {
                log(chalk_1.default.red(e.message || '生成出错'));
            }
            break;
        }
        case "init": {
            const repo = flags.repo || 'caotsinghua/iview-admin-template';
            const targetPath = flags.path;
            if (!targetPath) {
                log(chalk_1.default.bgRed('没有指定--path'));
                return;
            }
            const destination = path_1.default.resolve(process.cwd(), targetPath);
            log(chalk_1.default.white(`正在下载${repo}到${destination}...`));
            try {
                yield utils_1.generateAdminTemplateFromRepo(repo, destination);
                log(chalk_1.default.green('成功'));
            }
            catch (e) {
                log(chalk_1.default.red(e.message || '生成出错'));
            }
            break;
        }
    }
    if (cli.input.length === 0 && Object.keys(cli.flags).length === 0) {
        ink_1.render(react_1.default.createElement(Ui_1.default, null), {
            exitOnCtrlC: true
        });
    }
});
main();
//# sourceMappingURL=index.js.map