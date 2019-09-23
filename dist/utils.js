"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const download_git_repo_1 = __importDefault(require("download-git-repo"));
const metalsmith_1 = __importDefault(require("metalsmith"));
const handlebars_1 = __importDefault(require("handlebars"));
const config_1 = __importDefault(require("./config"));
const lodash_1 = __importDefault(require("lodash"));
function copyDir(fromDir, toDir) {
    if (fs_1.default.existsSync(toDir)) {
        const files = fs_1.default.readdirSync(fromDir);
        files.map(filename => {
            const fromFile = path_1.default.resolve(fromDir, filename);
            const toFile = path_1.default.resolve(toDir, filename);
            if (fs_1.default.statSync(fromFile).isDirectory()) {
                copyDir(fromFile, toFile);
            }
            else {
                fs_1.default.copyFileSync(fromFile, toFile);
            }
        });
    }
    else {
        fs_1.default.mkdirSync(toDir);
        copyDir(fromDir, toDir);
    }
}
function generateAdminTemplate(targetDir) {
    copyDir(config_1.default['admin-template-path'], targetDir);
}
exports.generateAdminTemplate = generateAdminTemplate;
function generateAdminTemplateAsync(targetDir) {
    return new Promise((resolve, reject) => {
        metalsmith_1.default(__dirname)
            .source(config_1.default['admin-template-path'])
            .destination(targetDir)
            .build(err => {
            if (err) {
                reject(err);
            }
            else {
                resolve();
            }
        });
    });
}
exports.generateAdminTemplateAsync = generateAdminTemplateAsync;
exports.generateAdminTemplateFromRepo = (repoName, targetDir) => {
    return new Promise((resolve, reject) => {
        download_git_repo_1.default(repoName, targetDir, (err) => {
            if (err) {
                reject(err);
            }
            resolve();
        });
    });
};
handlebars_1.default.registerHelper('upperFirst', str => {
    return lodash_1.default.upperFirst(str);
});
exports.generateCrudTemplate = (resourceName, destination) => {
    return new Promise((resolve, reject) => {
        metalsmith_1.default(__dirname)
            .source(config_1.default['crud-template-path'])
            .ignore([''])
            .destination(destination)
            .clean(false)
            .use(function (files, metalsmith, done) {
            Object.keys(files).forEach(filePath => {
                const contents = files[filePath].contents;
                let contentStr = contents.toString();
                contentStr = handlebars_1.default.compile(contentStr)({ resourceName });
                files[filePath].contents = contentStr;
            });
            done(undefined, files, metalsmith);
        })
            .build(err => {
            if (err) {
                reject(err);
            }
            else {
                resolve();
            }
        });
    });
};
exports.generateCrudVuexTemplate = (resourceName, destination, storePath) => {
    return new Promise((resolve, reject) => {
        metalsmith_1.default(__dirname)
            .source(config_1.default['crud-vuex-template-path'])
            .ignore(['store'])
            .destination(destination)
            .clean(false)
            .use(function (files, metalsmith, done) {
            Object.keys(files).forEach(filePath => {
                const contents = files[filePath].contents;
                let contentStr = contents.toString();
                contentStr = handlebars_1.default.compile(contentStr)({ resourceName });
                files[filePath].contents = contentStr;
            });
            done(undefined, files, metalsmith);
        })
            .build(err => {
            if (err) {
                reject(err);
            }
            else {
                console.log(storePath);
                metalsmith_1.default(__dirname)
                    .source(path_1.default.join(config_1.default['crud-vuex-template-path'], 'store'))
                    .destination(storePath)
                    .clean(false)
                    .use(function (files, metalsmith, done) {
                    Object.keys(files).forEach(filePath => {
                        const contents = files[filePath].contents;
                        let contentStr = contents.toString();
                        contentStr = handlebars_1.default.compile(contentStr)({ resourceName });
                        files[filePath].contents = contentStr;
                        files[`${resourceName}s.js`] = files[filePath];
                        delete files[filePath];
                    });
                    done(undefined, files, metalsmith);
                })
                    .build(err => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve();
                    }
                });
            }
        });
    });
};
//# sourceMappingURL=utils.js.map