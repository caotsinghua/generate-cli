"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const metalsmith_1 = __importDefault(require("metalsmith"));
const handlebars_1 = __importDefault(require("handlebars"));
const yaml_1 = __importDefault(require("yaml"));
const lodash_1 = __importDefault(require("lodash"));
let paths;
let definitions;
exports.readYaml = file => {
    const stats = fs_1.default.statSync(file);
    if (!stats.isFile()) {
        console.error('读取的不是文件');
    }
    const yamlFile = fs_1.default.readFileSync(file, { encoding: 'utf8' });
    const parsedObj = yaml_1.default.parse(yamlFile);
    paths = parsedObj.paths;
    definitions = parsedObj.definitions;
};
exports.parsePathsToApi = (paths) => {
    const result = [];
    for (let path in paths) {
        for (let method in paths[path]) {
            let temp = Object.assign({ path,
                method }, paths[path][method]);
            result.push(temp);
        }
    }
    return result;
};
exports.readYaml(path_1.default.join(__dirname, '../swagger.yaml'));
const apiObjs = exports.parsePathsToApi(paths);
exports.parseApiToAxiosExample = (apiObj) => {
    let ex = {
        path: apiObj.path,
        method: apiObj.method,
        params: [],
        pathParams: []
    };
    apiObj.parameters.forEach((param) => {
        if (param.in === 'path') {
            ex.pathParams.push(param.name);
        }
        else if (param.in === 'query') {
            ex.params.push(param.name);
        }
        else if (param.in === 'body') {
            ex.hasData = true;
        }
    });
    return ex;
};
const axiosExs = apiObjs.map(api => exports.parseApiToAxiosExample(api));
const parseApiName = (path) => {
    const parsePath = path
        .replace(/}/g, '')
        .replace(/{|:/g, 'by/')
        .split('/')
        .filter(item => !!item)
        .join('_');
    return lodash_1.default.upperFirst(lodash_1.default.camelCase(parsePath));
};
handlebars_1.default.registerHelper('parseApiName', parseApiName);
const parseUrl = (path, pathParams) => {
    let str = '';
    pathParams.forEach(param => {
        let reg = new RegExp(`{${param}}`);
        str = path.replace(reg, '${data.' + param + '}');
    });
    return str || path;
};
handlebars_1.default.registerHelper('parseUrl', parseUrl);
metalsmith_1.default(path_1.default.resolve(__dirname, '../'))
    .source('api-template')
    .destination('test-api')
    .use((files, metalsmith, done) => {
    Object.keys(files).forEach(filename => {
        const content = files[filename].contents.toString('utf8');
        const template = handlebars_1.default.compile(content)({
            apis: axiosExs
        });
        const destFileName = filename.replace(/hbs$/, 'js');
        files[filename].contents = template;
        files[destFileName] = files[filename];
        delete files[filename];
    });
    done(undefined, files, metalsmith);
})
    .build(err => {
    console.log(err);
});
//# sourceMappingURL=yaml.js.map